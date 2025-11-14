import { Link } from 'react-router-dom';
import { Product } from '@/lib/products';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-border/50 transition-smooth hover:shadow-lg hover:-translate-y-2">
        <div className="aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category.replace('-', ' ')}
          </p>
          <h3 className="font-medium text-sm mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-accent">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <div className="flex gap-2 mt-2">
            {product.colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
