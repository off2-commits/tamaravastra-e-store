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
        <CardContent className="p-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            {product.category.replace('-', ' ')}
          </p>
          <h3 className="font-medium text-sm mb-3 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-accent mb-4">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <div className="flex gap-3 justify-center">
            {product.colors.slice(0, 3).map((color, i) => (
              <div
                key={i}
                className="h-4 w-4 rounded-full border-2 transition-smooth"
                style={{
                  backgroundColor: color.hex,
                  borderColor: '#e0e0e0'
                }}
                title={color.name}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
