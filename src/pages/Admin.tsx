import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LogOut, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { verifyAdminLogin, setAdminSession, getAdminSession, clearAdminSession } from '@/lib/auth-utils';
import { mockProducts } from '@/lib/products';

// Mock data for admin dashboard
const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Priya Sharma', total: 12500, status: 'Delivered', date: '2024-01-15', items: 1 },
  { id: 'ORD-002', customer: 'Anjali Patel', total: 18999, status: 'Processing', date: '2024-01-18', items: 1 },
  { id: 'ORD-003', customer: 'Neha Gupta', total: 25000, status: 'Shipped', date: '2024-01-19', items: 2 },
  { id: 'ORD-004', customer: 'Deepika Singh', total: 9750, status: 'Delivered', date: '2024-01-20', items: 1 },
  { id: 'ORD-005', customer: 'Meera Reddy', total: 31499, status: 'Processing', date: '2024-01-21', items: 3 },
];

export default function Admin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check if already logged in
  useEffect(() => {
    const token = getAdminSession();
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (verifyAdminLogin(username, password)) {
      const token = btoa(`admin_${Date.now()}_${Math.random()}`);
      setAdminSession(token);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } else {
      setError('Invalid credentials. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-muted border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-lg text-sm text-destructive">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin76"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isLoading}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate dashboard metrics
  const totalOrders = MOCK_ORDERS.length;
  const totalRevenue = MOCK_ORDERS.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = mockProducts.length;
  const avgOrderValue = totalRevenue / totalOrders;
  const deliveredOrders = MOCK_ORDERS.filter(o => o.status === 'Delivered').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-[60px] z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="container-custom flex items-center justify-between h-16">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your shop</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                  <p className="text-3xl font-bold">{totalOrders}</p>
                </div>
                <ShoppingCart className="h-10 w-10 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                </div>
                <TrendingUp className="h-10 w-10 text-accent opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Products</p>
                  <p className="text-3xl font-bold">{totalProducts}</p>
                </div>
                <Package className="h-10 w-10 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Order Value</p>
                  <p className="text-3xl font-bold">₹{avgOrderValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <Users className="h-10 w-10 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Order ID</th>
                    <th className="text-left py-3 px-4 font-medium">Customer</th>
                    <th className="text-left py-3 px-4 font-medium">Items</th>
                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-smooth"
                      onClick={() => navigate(`/admin/order/${order.id}`)}
                    >
                      <td className="py-3 px-4 font-medium text-accent hover:underline">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.items}</td>
                      <td className="py-3 px-4 font-bold text-accent">₹{order.total.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Section */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Product</th>
                    <th className="text-left py-3 px-4 font-medium">Category</th>
                    <th className="text-left py-3 px-4 font-medium">Stock</th>
                    <th className="text-left py-3 px-4 font-medium">Price</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.slice(0, 5).map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border/50 hover:bg-muted/50 cursor-pointer transition-smooth"
                    >
                      <td className="py-3 px-4 font-medium">
                        <Link
                          to={`/admin/product/${product.id}`}
                          className="text-accent hover:underline"
                        >
                          {product.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 capitalize">{product.category.replace('-', ' ')}</td>
                      <td className="py-3 px-4">{product.stock} units</td>
                      <td className="py-3 px-4 font-bold text-accent">₹{product.price.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock > 15
                            ? 'bg-green-100 text-green-800'
                            : product.stock > 5
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 15 ? 'In Stock' : product.stock > 5 ? 'Low Stock' : 'Critical'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
