import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Package, CreditCard, User, Mail, Phone, Edit2, Trash2, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductReviews, mockReviews } from '@/lib/reviews';

// Mock detailed order data
const MOCK_ORDER_DETAILS: Record<string, any> = {
  'ORD-001': {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    items: [
      { name: 'Royal Banarasi Silk Saree', quantity: 1, price: 12500, color: 'Maroon' }
    ],
    subtotal: 12500,
    shipping: 0,
    tax: 0,
    total: 12500,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Completed',
    customer: {
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      address: '123 Silk Lane, Delhi, 110001',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India'
    },
    deliveryDate: '2024-01-18',
    trackingNumber: 'TRK-2024-001234',
    notes: 'Delivered to recipient'
  },
  'ORD-002': {
    id: 'ORD-002',
    date: '2024-01-18',
    status: 'Processing',
    items: [
      { name: 'Designer Party Wear Saree', quantity: 1, price: 18999, color: 'Emerald' }
    ],
    subtotal: 18999,
    shipping: 0,
    tax: 0,
    total: 18999,
    paymentMethod: 'Debit Card',
    paymentStatus: 'Completed',
    customer: {
      name: 'Anjali Patel',
      email: 'anjali.patel@email.com',
      phone: '+91 98765 43211',
      address: '456 Silk Road, Mumbai, 400001',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    deliveryDate: null,
    trackingNumber: null,
    notes: 'Order being prepared for shipment'
  },
  'ORD-003': {
    id: 'ORD-003',
    date: '2024-01-19',
    status: 'Shipped',
    items: [
      { name: 'Royal Banarasi Silk Saree', quantity: 1, price: 12500, color: 'Gold' },
      { name: 'Pure Kanjivaram Silk', quantity: 1, price: 12500, color: 'Mustard' }
    ],
    subtotal: 25000,
    shipping: 0,
    tax: 0,
    total: 25000,
    paymentMethod: 'UPI',
    paymentStatus: 'Completed',
    customer: {
      name: 'Neha Gupta',
      email: 'neha.gupta@email.com',
      phone: '+91 98765 43212',
      address: '789 Heritage Street, Bangalore, 560001',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India'
    },
    deliveryDate: '2024-01-23',
    trackingNumber: 'TRK-2024-001235',
    notes: 'Shipped via Express Courier'
  }
};

export default function AdminOrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = MOCK_ORDER_DETAILS[orderId || ''];
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order?.status || '');
  const [customerData, setCustomerData] = useState(order?.customer || {});

  // Get reviews for products in this order
  const orderReviews = order ? order.items.flatMap(item =>
    getProductReviews(item.name)
      .filter(review => review.orderId === orderId)
  ) : [];

  const handleDeleteReview = (reviewId: string) => {
    const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex > -1) {
      mockReviews.splice(reviewIndex, 1);
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-semibold mb-4">Order not found</p>
            <Button onClick={() => navigate('/admin')} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="container-custom flex items-center justify-between py-5">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Order {order.id}</h1>
              <p className="text-sm text-muted-foreground">View order details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Order Date:</span>
                  <span className="font-medium">{order.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="px-3 py-1 rounded-lg border border-border bg-background text-sm font-medium"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                {order.trackingNumber && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tracking Number:</span>
                    <span className="font-medium font-mono">{order.trackingNumber}</span>
                  </div>
                )}
                {order.deliveryDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Delivery Date:</span>
                    <span className="font-medium">{order.deliveryDate}</span>
                  </div>
                )}
                {order.notes && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Notes:</p>
                    <p className="text-sm">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Qty: {item.quantity}</p>
                        <p className="text-accent font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {order.shipping > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping:</span>
                      <span>₹{order.shipping.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {order.tax > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax:</span>
                      <span>₹{order.tax.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total:</span>
                    <span className="text-accent">₹{order.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <div>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Details
                </CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditingCustomer(!isEditingCustomer)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  {isEditingCustomer ? 'Done' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditingCustomer ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <Input
                        value={customerData.name}
                        onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <Input
                        type="email"
                        value={customerData.email}
                        onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <Input
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                        className="text-sm"
                      />
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">Address</p>
                      <Input
                        value={customerData.address}
                        onChange={(e) => setCustomerData({...customerData, address: e.target.value})}
                        className="text-sm mb-2"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="City"
                          value={customerData.city}
                          onChange={(e) => setCustomerData({...customerData, city: e.target.value})}
                          className="text-sm"
                        />
                        <Input
                          placeholder="State"
                          value={customerData.state}
                          onChange={(e) => setCustomerData({...customerData, state: e.target.value})}
                          className="text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input
                          placeholder="Pincode"
                          value={customerData.pincode}
                          onChange={(e) => setCustomerData({...customerData, pincode: e.target.value})}
                          className="text-sm"
                        />
                        <Input
                          placeholder="Country"
                          value={customerData.country}
                          onChange={(e) => setCustomerData({...customerData, country: e.target.value})}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="font-medium">{customerData.name}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <p className="font-medium">{customerData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                        <p className="font-medium">{customerData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pt-4 border-t border-border">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="w-full">
                        <p className="text-sm text-muted-foreground mb-2">Delivery Address</p>
                        <p className="font-medium text-sm">{customerData.address}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {customerData.city}, {customerData.state} {customerData.pincode}
                        </p>
                        <p className="text-sm text-muted-foreground">{customerData.country}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Reviews for This Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orderReviews.length > 0 ? (
                  <div className="space-y-4">
                    {orderReviews.map((review) => (
                      <div key={review.id} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold">{review.reviewerName}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'fill-accent text-accent'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">
                            {review.rating}/5
                          </span>
                        </div>

                        <h4 className="font-semibold text-sm mb-1">{review.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{review.text}</p>

                        {review.images.length > 0 && (
                          <div className="flex gap-2">
                            {review.images.map((image, i) => (
                              <img
                                key={i}
                                src={image}
                                alt={`Review image ${i}`}
                                className="w-16 h-16 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    No reviews yet for this order
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
