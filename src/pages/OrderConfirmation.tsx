import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl text-muted-foreground mb-4">
          Your order has been placed successfully
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Order ID: <span className="font-mono font-bold">{orderId}</span>
        </p>
        <p className="text-muted-foreground mb-8">
          We've sent a confirmation email with your order details.
          You'll receive a shipping notification once your order is on its way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Back to Home
            </Button>
          </Link>
          <Link to="/catalogue">
            <Button size="lg" variant="outline">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
