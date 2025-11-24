import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchCoupons, createCoupon, deleteCoupon, Coupon } from '@/lib/coupons';
import { toast } from 'sonner';

export default function AdminCoupons() {
    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    const [newCoupon, setNewCoupon] = useState({
        code: '',
        discount_type: 'percentage' as 'percentage' | 'fixed',
        discount_value: 0,
        min_cart_products: 0,
        is_active: true
    });

    useEffect(() => {
        loadCoupons();
    }, []);

    const loadCoupons = async () => {
        setIsLoading(true);
        const data = await fetchCoupons();
        setCoupons(data);
        setIsLoading(false);
    };

    const handleCreate = async () => {
        if (!newCoupon.code || newCoupon.discount_value <= 0) {
            toast.error('Please fill in valid coupon details');
            return;
        }

        setIsCreating(true);
        const created = await createCoupon(newCoupon);
        if (created) {
            toast.success('Coupon created successfully');
            setNewCoupon({
                code: '',
                discount_type: 'percentage',
                discount_value: 0,
                min_cart_products: 0,
                is_active: true
            });
            loadCoupons();
        } else {
            toast.error('Failed to create coupon');
        }
        setIsCreating(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this coupon?')) {
            const success = await deleteCoupon(id);
            if (success) {
                toast.success('Coupon deleted');
                loadCoupons();
            } else {
                toast.error('Failed to delete coupon');
            }
        }
    };

    return (
        <div className="min-h-screen bg-background">
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
                            <h1 className="text-2xl font-bold">Manage Coupons</h1>
                            <p className="text-sm text-muted-foreground">Create and manage discount codes</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Coupon Form */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create New Coupon</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Coupon Code</label>
                                    <Input
                                        value={newCoupon.code}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                                        placeholder="SUMMER25"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Discount Type</label>
                                    <select
                                        value={newCoupon.discount_type}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, discount_type: e.target.value as 'percentage' | 'fixed' })}
                                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                                    >
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (₹)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Discount Value</label>
                                    <Input
                                        type="number"
                                        value={newCoupon.discount_value}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, discount_value: parseFloat(e.target.value) || 0 })}
                                        placeholder="10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Min Cart Items</label>
                                    <Input
                                        type="number"
                                        value={newCoupon.min_cart_products}
                                        onChange={(e) => setNewCoupon({ ...newCoupon, min_cart_products: parseInt(e.target.value) || 0 })}
                                        placeholder="0"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Minimum number of items required in cart</p>
                                </div>

                                <Button
                                    onClick={handleCreate}
                                    disabled={isCreating}
                                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                                >
                                    {isCreating ? 'Creating...' : 'Create Coupon'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Coupons List */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Active Coupons</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <p className="text-center text-muted-foreground py-8">Loading coupons...</p>
                                ) : coupons.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Ticket className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                        <p>No coupons found</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {coupons.map((coupon) => (
                                            <div key={coupon.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card hover:bg-muted/30 transition-colors">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="font-bold text-lg tracking-wider">{coupon.code}</span>
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full font-medium">Active</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {coupon.discount_type === 'percentage' ? `${coupon.discount_value}% OFF` : `₹${coupon.discount_value} OFF`}
                                                        {coupon.min_cart_products > 0 && ` • Min ${coupon.min_cart_products} items`}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(coupon.id)}
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
