import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { filterProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [maxPrice, setMaxPrice] = useState(40000);
  const [sortBy, setSortBy] = useState('newest');

  const products = filterProducts(
    category === 'all' ? undefined : category,
    maxPrice
  );

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-64 flex items-center justify-center bg-primary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&h=400&fit=crop)`,
          }}
        />
        <div className="relative z-10 text-center text-primary-foreground">
          <h1 className="text-5xl font-bold mb-4">EXPLORE THE COLLECTION</h1>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Shop All
          </Button>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Filters */}
        <div className="mb-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {['all', 'cotton', 'silk', 'party-wear', 'designer'].map(cat => (
              <Button
                key={cat}
                variant={category === cat ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(cat)}
                className={
                  category === cat
                    ? 'bg-accent text-accent-foreground'
                    : 'border-border hover:border-accent'
                }
              >
                {cat.replace('-', ' ').toUpperCase()}
              </Button>
            ))}
          </div>

          <div className="flex gap-4 items-center w-full lg:w-auto">
            <div className="flex-1 lg:w-48">
              <label className="text-sm mb-2 block">Max Price: ₹{maxPrice.toLocaleString('en-IN')}</label>
              <Slider
                value={[maxPrice]}
                onValueChange={([val]) => setMaxPrice(val)}
                max={40000}
                min={1000}
                step={1000}
                className="w-full"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No products found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
