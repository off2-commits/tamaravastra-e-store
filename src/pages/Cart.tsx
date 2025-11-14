import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center page-transition">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Add some beautiful sarees to your collection
          </p>
          <Link to="/catalogue">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={`${item.id}-${item.color}`} className="bg-card border border-border rounded-lg p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded"
                  />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id, item.color)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <p className="text-lg font-bold text-accent">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-accent">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/catalogue">
                <Button variant="outline" className="w-full mt-3">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
