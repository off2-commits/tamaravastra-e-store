import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { createOrder, OrderItem } from '@/lib/orders';
import { verifyCoupon, Coupon } from '@/lib/coupons';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const finalTotal = Math.max(0, totalPrice - discountAmount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;

    const result = await verifyCoupon(couponCode, items.length);
    if (result.valid && result.coupon) {
      setAppliedCoupon(result.coupon);
      let discount = 0;
      if (result.coupon.discount_type === 'percentage') {
        discount = (totalPrice * result.coupon.discount_value) / 100;
      } else {
        discount = result.coupon.discount_value;
      }
      setDiscountAmount(discount);
      toast.success('Coupon applied successfully!');
    } else {
      setAppliedCoupon(null);
      setDiscountAmount(0);
      toast.error(result.message || 'Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode('');
    toast.info('Coupon removed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const required = ['name', 'email', 'phone', 'address1', 'city', 'state', 'pincode'];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);

    if (missing.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create Order on Backend (Netlify Function)
      const response = await fetch('/.netlify/functions/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount: finalTotal }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Razorpay order');
      }

      const order = await response.json();

      // 2. Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Tamaravastra',
        description: 'Purchase from Tamaravastra',
        image: '/lovable-uploads/logo.png', // Replace with actual logo URL if available
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // 3. Verify Payment
            const verifyResponse = await fetch('/.netlify/functions/verify-payment', {
              method: 'POST',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.status === 'success') {
              // 4. Create Order in Supabase
              const subtotal = totalPrice;
              const shipping = 0;
              const tax = 0;
              const total = finalTotal;

              const orderPayload = {
                subtotal,
                shipping,
                tax,
                total,
                payment_method: 'Razorpay',
                payment_status: 'Completed',
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone,
                address: `${formData.address1}${formData.address2 ? ', ' + formData.address2 : ''}`,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                country: 'India',
                status: 'Processing',
                // Store Razorpay details if needed in a separate column or notes
                notes: `Razorpay Order ID: ${response.razorpay_order_id}, Payment ID: ${response.razorpay_payment_id}${appliedCoupon ? `, Coupon: ${appliedCoupon.code} (-₹${discountAmount})` : ''}`
              };

              const itemsPayload: OrderItem[] = items.map(i => ({
                product_id: i.id,
                name: i.name,
                price: i.price,
                quantity: i.quantity,
                color: i.color,
              }));

              const res = await createOrder(orderPayload, itemsPayload);
              if (!res) throw new Error('Failed to create order in database');

              clearCart();
              toast.success('Payment successful! Order placed.');
              navigate(`/order/${res.orderId}`);
            } else {
              toast.error('Payment verification failed');
            }
          } catch (err) {
            console.error(err);
            toast.error('Error verifying payment');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        toast.error(response.error.description);
        setIsProcessing(false);
      });
      rzp1.open();

    } catch (err) {
      console.error(err);
      toast.error('Failed to initiate payment. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address1">Address Line 1 *</Label>
                    <Input
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address2">Address Line 2</Label>
                    <Input
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
                <p className="text-muted-foreground mb-4">
                  Secure payment via Razorpay.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={`${item.id}-${item.color}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.color}</p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <Label htmlFor="coupon">Coupon Code</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    disabled={!!appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <Button type="button" variant="destructive" onClick={removeCoupon}>
                      Remove
                    </Button>
                  ) : (
                    <Button type="button" variant="outline" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  )}
                </div>
                {appliedCoupon && (
                  <p className="text-xs text-green-600 mt-1">
                    Coupon applied! You saved ₹{discountAmount.toLocaleString('en-IN')}
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
