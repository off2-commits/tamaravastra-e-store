import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { getBestsellers } from '@/lib/products';
import heroImage from '@/assets/hero-saree.jpg';

export default function Landing() {
  const bestsellers = getBestsellers();

  return (
    <div className="min-h-screen page-transition">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden -mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, hsl(210 75% 12% / 0.85) 0%, hsl(210 75% 12% / 0.4) 100%)',
          }}
        />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 tracking-wider transition-all duration-500">
            TAMARAVASTRA
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl mb-3 opacity-90">
            Curated Ethnic Sarees
          </p>
          <p className="text-lg mb-8 opacity-80">Discover new collection</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/catalogue">
              <Button
                size="lg"
                className="bg-accent hover:bg-white text-accent-foreground hover:text-foreground font-medium px-8 h-12 transition-smooth"
              >
                Shop Sarees
              </Button>
            </Link>
            <Link to="/catalogue?category=party-wear">
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-foreground font-medium px-8 h-12 transition-smooth"
              >
                Shop Party Wear
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center mb-12">OUR BESTSELLERS</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/catalogue">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                View All Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
