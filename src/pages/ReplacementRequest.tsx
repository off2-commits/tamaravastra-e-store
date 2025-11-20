import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fetchOrdersByPhone, fetchOrderItems, updateOrderReplacement, type OrderItem as TOrderItem, type Order as TOrder } from '@/lib/orders';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';
import { fetchProductById } from '@/lib/products';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

declare global {
  interface Window { phoneEmailListener?: (userObj: { user_json_url?: string }) => void }
}

export default function ReplacementRequest() {
  const [loading, setLoading] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState<string>('');
  type OrderDB = TOrder & { id: string };
  type OrderWithItems = OrderDB & { items: TOrderItem[] };
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const { addToCart } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetOrderId, setTargetOrderId] = useState<string | null>(null);
  const isValidVerifiedPhone = useMemo(() => /^\d{10}$/.test(verifiedPhone), [verifiedPhone]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.phone.email/sign_in_button_v1.js';
    script.async = true;
    document.body.appendChild(script);

    window.phoneEmailListener = async (userObj: { user_json_url?: string }) => {
      try {
        setError('');
        setLoading(true);
        const url = userObj?.user_json_url;
        if (!url) throw new Error('Verification data missing');
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        const data = await resp.json();
        const raw = `${data.user_country_code || ''}${data.user_phone_number || ''}`.trim();
        const digits = raw.replace(/\D/g, '');
        const normalized = digits.startsWith('91') ? digits.slice(-10) : digits;
        setVerifiedPhone(normalized);
        setVerified(true);
        if (!/^\d{10}$/.test(normalized)) throw new Error('Invalid verified phone number');
        const list = await fetchOrdersByPhone(normalized);
        const enriched = await Promise.all(
          list.map(async (o: OrderDB) => ({ ...o, items: await fetchOrderItems(o.id) }))
        );
        setOrders(enriched);
      } catch (e: unknown) {
        setError('Failed to verify phone or fetch orders');
      } finally {
        setLoading(false);
      }
    };

    return () => { delete window.phoneEmailListener };
  }, []);

  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">Request Replacement</h1>
          {verified && isValidVerifiedPhone && (
            <Badge variant="secondary" className="transition-smooth">Verified {verifiedPhone}</Badge>
          )}
        </div>

        {!verified && (
          <Card className="mb-8 transition-smooth">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4" aria-live="polite">Verify your phone number to view your orders.</p>
              <div className="pe_signin_button" data-client-id="16029683633833747683" />
              {loading && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-24" />
                  <Skeleton className="h-24" />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {verified && !loading && orders.length === 0 && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">No orders found for this verified number.</p>
              <div className="mt-4 flex gap-2">
                <Link to="/catalogue"><Button variant="outline">Browse Catalogue</Button></Link>
                <Link to="/contact"><Button>Contact Support</Button></Link>
              </div>
            </CardContent>
          </Card>
        )}

        {orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {orders.map((order) => (
              <Card key={order.id} className="transition-smooth hover:shadow-[var(--shadow-card-hover)]">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order {order.id}</span>
                    <span className="text-xs text-muted-foreground">{(order.date || '').slice(0, 10)}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="mb-4">
                    <AccordionItem value="items">
                      <AccordionTrigger>Items</AccordionTrigger>
                      <AccordionContent>
                        <ScrollArea className="h-40">
                          <div className="space-y-2">
                            {order.items?.map((item: TOrderItem, i: number) => (
                              <div key={i} className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">Qty: {item.quantity} {item.color ? `• ${item.color}` : ''}</p>
                                </div>
                                <span className="text-sm font-bold text-accent">₹{Number(item.price).toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="flex gap-2">
                    <Link to={`/product/${order.items?.[0]?.product_id || ''}#reviews`} className="transition-smooth">
                      <Button size="sm" variant="outline">Review</Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-accent text-accent-foreground transition-smooth"
                      onClick={() => { setTargetOrderId(order.id); setConfirmOpen(true); }}
                    >
                      Replacement
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="transition-smooth"
                      onClick={async () => {
                        try {
                          for (const it of order.items || []) {
                            const p = await fetchProductById(it.product_id);
                            addToCart({
                              id: it.product_id,
                              name: it.name,
                              price: Number(it.price),
                              image: p?.image || '',
                              color: it.color || 'Default',
                              maxStock: p?.stock || 99,
                            });
                          }
                          window.location.href = '/cart';
                        } catch {
                          toast.error('Failed to add items to cart');
                        }
                      }}
                    >
                      Reorder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Replacement</AlertDialogTitle>
              <AlertDialogDescription>
                This will mark your order as Replacement in our system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (!targetOrderId) return;
                  const ok = await updateOrderReplacement(targetOrderId);
                  if (ok) {
                    toast.success('Order marked for replacement');
                    setOrders(prev => prev.map(o => o.id === targetOrderId ? { ...o, status: 'Replacement', payment_status: 'Replacement' } : o));
                  } else {
                    toast.error('Failed to update order');
                  }
                  setConfirmOpen(false);
                  setTargetOrderId(null);
                }}
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}