import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, Check } from 'lucide-react';
import { getProductById, mockProducts } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { StarRating } from '@/components/StarRating';
import { ReviewCard } from '@/components/ReviewCard';
import { ReviewForm } from '@/components/ReviewForm';
import { getProductReviews, getAverageRating } from '@/lib/reviews';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [refreshReviews, setRefreshReviews] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/catalogue">
            <Button>Back to Catalogue</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedColor) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor.name,
      maxStock: product.stock,
    });
  };

  const handleBuyNow = () => {
    if (!selectedColor) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor.name,
      maxStock: product.stock,
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8 text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/catalogue" className="hover:text-foreground">Sarees</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div>
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-smooth ${
                    mainImage === i ? 'border-accent' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-accent mb-6">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Select Color: {selectedColor?.name}
              </label>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`relative h-10 w-10 rounded-full border-2 transition-smooth ${
                      selectedColor?.name === color.name
                        ? 'border-accent scale-110'
                        : 'border-border hover:border-accent/50'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor?.name === color.name && (
                      <Check className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                  ({product.stock} in stock)
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg font-medium mb-3"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            {/* Buy Now */}
            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 text-lg font-medium mb-4"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>

            <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-sm">Free standard shipping on all orders!</span>
            </div>

            {/* Description */}
            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger>Care Instructions</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Dry clean only recommended</li>
                    <li>• Store in a cool, dry place</li>
                    <li>• Avoid direct sunlight</li>
                    <li>• Iron on low heat if needed</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-border pt-20">
          <h2 className="text-3xl font-bold mb-2">Customer Reviews</h2>

          {/* Review Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="md:col-span-1">
              <div className="space-y-4">
                <div>
                  <p className="text-4xl font-bold text-accent">{getAverageRating(id || '').toFixed(1)}</p>
                  <StarRating rating={getAverageRating(id || '')} showText={false} size="lg" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on {getProductReviews(id || '').length} reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Review Form */}
            <div className="md:col-span-3">
              <ReviewForm
                productId={id || ''}
                onReviewSubmitted={() => setRefreshReviews(r => r + 1)}
              />
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">All Reviews</h3>
            {getProductReviews(id || '').length > 0 ? (
              <div className="space-y-4">
                {getProductReviews(id || '').map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-20">
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
