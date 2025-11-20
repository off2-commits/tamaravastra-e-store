import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { fetchBestsellers, fetchProducts } from '@/lib/products';
import { ReviewCard } from '@/components/ReviewCard';
import { LazyReveal } from '../components/LazyReveal';
import { mockReviews } from '@/lib/reviews';
import heroImage from '@/assets/hero-saree.jpg';

export default function Landing() {
  const [bestsellers, setBestsellers] = useState([] as Awaited<ReturnType<typeof fetchBestsellers>>);
  const [featured, setFeatured] = useState([] as Awaited<ReturnType<typeof fetchProducts>>);
  const testimonials = mockReviews.slice(0, 3);
  const heroLogoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    (async () => {
      const [bs, all] = await Promise.all([fetchBestsellers(), fetchProducts()]);
      setBestsellers(bs);
      setFeatured(all.filter(p => !p.isBestseller).slice(0, 4));
    })();
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero-section');
    const el = heroLogoRef.current;
    if (!hero || !el) return;

    let ticking = false;
    const update = () => {
      const rect = hero.getBoundingClientRect();
      const viewportH = window.innerHeight || 800;
      const scrolled = Math.min(Math.max(-rect.top, 0), rect.height);
      const progress = Math.min(scrolled / rect.height, 1);
      const translateY = -(viewportH * 0.35) * progress;
      const scale = 1 - 0.6 * progress;
      const opacity = 1 - 0.9 * progress;
      el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
      el.style.opacity = String(opacity);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onResize = () => update();

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  

  return (
    <div className="min-h-screen page-transition">
      {/* Hero Section */}
      <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden -mt-20">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          poster={heroImage}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/tamaravastra.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, hsl(210 75% 12% / 0.85) 0%, hsl(210 75% 12% / 0.4) 100%)',
          }}
        />
        
        <div className="relative z-10 text-center text-white px-4 pt-24 sm:pt-32">
          <h1
            ref={heroLogoRef}
            className="mx-auto mb-6 font-bold tracking-widest text-white text-6xl sm:text-7xl md:text-8xl will-change-transform"
            style={{ transformOrigin: '50% 0%', pointerEvents: 'none' }}
          >
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
              <LazyReveal key={product.id}>
                <ProductCard product={product} />
              </LazyReveal>
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

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <LazyReveal key={product.id}>
                <ProductCard product={product} />
              </LazyReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-8">Quality Assurance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Authentic Fabrics', desc: 'Sourced from trusted weavers and verified mills.' },
              { title: 'Craftsmanship Check', desc: 'Multi-point inspection for weave, dye, and finish.' },
              { title: 'Ethical Sourcing', desc: 'Fair trade partnerships and transparent processes.' },
            ].map((item) => (
              <LazyReveal key={item.title}>
                <div className="p-6 border rounded-lg bg-card text-center shadow-sm">
                  <div className="text-lg font-semibold mb-2">{item.title}</div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </LazyReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-10">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((review) => (
              <LazyReveal key={review.id}>
                <ReviewCard review={review} />
              </LazyReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
