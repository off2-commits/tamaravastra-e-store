import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts } from '@/lib/products';

export default function AdminProductEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.id === productId);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    category: product?.category || '',
    stock: product?.stock || 0,
    description: product?.description || '',
    feature1: '',
    feature2: '',
    feature3: '',
    colors: product?.colors || [{ name: '', hex: '' }],
  });

  const [isSaving, setIsSaving] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-semibold mb-4">Product not found</p>
            <Button onClick={() => navigate('/admin')} className="w-full">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleColorChange = (index: number, field: 'name' | 'hex', value: string) => {
    const newColors = [...formData.colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setFormData(prev => ({ ...prev, colors: newColors }));
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: '', hex: '#000000' }]
    }));
  };

  const removeColor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="container-custom flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Edit Product</h1>
              <p className="text-sm text-muted-foreground">Manage product details and inventory</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="">Select Category</option>
                      <option value="cotton">Cotton</option>
                      <option value="silk">Silk</option>
                      <option value="party-wear">Party Wear</option>
                      <option value="designer">Designer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                    <Input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
                  <Input
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Features */}
            <Card>
              <CardHeader>
                <CardTitle>Product Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Feature 1</label>
                  <Input
                    name="feature1"
                    value={formData.feature1}
                    onChange={handleInputChange}
                    placeholder="e.g., Pure silk fabric"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Feature 2</label>
                  <Input
                    name="feature2"
                    value={formData.feature2}
                    onChange={handleInputChange}
                    placeholder="e.g., Hand-woven"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Feature 3</label>
                  <Input
                    name="feature3"
                    value={formData.feature3}
                    onChange={handleInputChange}
                    placeholder="e.g., Traditional design"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Available Colors</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addColor}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Color
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex items-end gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-2">Color Name</label>
                      <Input
                        value={color.name}
                        onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                        placeholder="e.g., Maroon, Gold"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <div>
                        <label className="block text-sm font-medium mb-2">Hex Code</label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="text"
                            value={color.hex}
                            onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                            placeholder="#000000"
                            className="w-28"
                          />
                          <div
                            className="w-12 h-10 rounded-lg border-2 border-border"
                            style={{ backgroundColor: color.hex }}
                          />
                        </div>
                      </div>
                      {formData.colors.length > 1 && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeColor(index)}
                          className="h-10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Product Preview */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-sm text-muted-foreground">Product Image</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Name</p>
                    <p className="font-medium text-sm line-clamp-2">{formData.name || 'Product Name'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Category</p>
                    <p className="font-medium text-sm capitalize">{formData.category.replace('-', ' ') || 'Category'}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Price</p>
                    <p className="text-lg font-bold text-accent">₹{formData.price.toLocaleString('en-IN')}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Colors</p>
                    <div className="flex gap-2">
                      {formData.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border-2 border-border"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Stock</p>
                    <p className={`font-medium text-sm ${
                      formData.stock > 15
                        ? 'text-green-600'
                        : formData.stock > 5
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {formData.stock} units {formData.stock > 15 ? '✓' : ''}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
