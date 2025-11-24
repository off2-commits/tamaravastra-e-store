import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Upload, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchProductById, Product } from '@/lib/products';

export default function AdminProductEdit() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    discount_price: 0,
    category: '',
    stock: 0,
    description: '',
    feature1: '',
    feature2: '',
    feature3: '',
    colors: [{ name: '', hex: '' }],
  });

  const [newImageUrl, setNewImageUrl] = useState('');

  const [images, setImages] = useState([
    { id: 1, src: '/placeholder.svg', name: 'Main Image' },
  ]);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      if (!productId) {
        setIsLoading(false);
        return;
      }
      const p = await fetchProductById(productId);
      setProduct(p);
      if (p) {
        setFormData({
          name: p.name,
          price: p.price,
          discount_price: p.discount_price || 0,
          category: p.category,
          stock: p.stock,
          description: p.description,
          feature1: '',
          feature2: '',
          feature3: '',
          colors: p.colors && p.colors.length > 0 ? p.colors : [{ name: '', hex: '' }],
        });
        const main = p.images && p.images.length > 0 ? p.images[0] : p.image;
        const imgs = (p.images && p.images.length > 0 ? p.images : [main]).filter(Boolean);
        setImages(imgs.map((src, i) => ({ id: i + 1, src, name: i === 0 ? 'Main Image' : `Image ${i + 1}` })));
      }
      setIsLoading(false);
    })();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-semibold mb-4">Loading product...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
      [name]: name === 'price' || name === 'stock' || name === 'discount_price' ? parseFloat(value) || 0 : value
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

  const handleAddImage = () => {
    if (newImageUrl) {
      setImages(prev => [...prev, {
        id: Date.now(),
        src: newImageUrl,
        name: `Image ${prev.length + 1}`
      }]);
      setNewImageUrl('');
    }
  };

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (!draggedId) return;

    const draggedIndex = images.findIndex(img => img.id === draggedId);
    const targetIndex = images.findIndex(img => img.id === targetId);

    if (draggedIndex !== targetIndex) {
      const newImages = [...images];
      [newImages[draggedIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[draggedIndex]];
      setImages(newImages);
    }
    setDraggedId(null);
  };

  const removeImage = (id: number) => {
    if (images.length > 1) {
      setImages(images.filter(img => img.id !== id));
    }
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <div>
                    <label className="block text-sm font-medium mb-2">Discount Price (₹)</label>
                    <Input
                      name="discount_price"
                      type="number"
                      value={formData.discount_price}
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

            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      draggable
                      onDragStart={() => handleDragStart(image.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, image.id)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 border-dashed cursor-move transition-all ${draggedId === image.id ? 'opacity-50 border-accent' : 'border-border hover:border-accent'
                        }`}
                    >
                      <img src={image.src} alt={image.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all flex items-center justify-center gap-2">
                        <GripVertical className="h-5 w-5 text-white opacity-0 hover:opacity-100" />
                        {images.length > 1 && (
                          <button
                            onClick={() => removeImage(image.id)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg opacity-0 hover:opacity-100 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-accent transition-all flex flex-col items-center justify-center p-4 bg-muted/50 hover:bg-muted">
                    <div className="text-center w-full">
                      <p className="text-xs text-muted-foreground mb-2">Add Image URL</p>
                      <Input
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://..."
                        className="mb-2 h-8 text-xs"
                      />
                      <Button
                        size="sm"
                        onClick={handleAddImage}
                        disabled={!newImageUrl}
                        className="w-full h-8"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Drag to reorder images. First image will be the main product image.</p>
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
                    {formData.discount_price && formData.discount_price < formData.price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground line-through">₹{formData.price.toLocaleString('en-IN')}</span>
                        <span className="text-lg font-bold text-accent">₹{formData.discount_price.toLocaleString('en-IN')}</span>
                      </div>
                    ) : (
                      <p className="text-lg font-bold text-accent">₹{formData.price.toLocaleString('en-IN')}</p>
                    )}
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
                    <p className={`font-medium text-sm ${formData.stock > 15
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
