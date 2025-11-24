import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { fetchBestsellers, fetchProducts } from '@/lib/products';
import { ReviewCard } from '@/components/ReviewCard';
import { LazyReveal } from '../components/LazyReveal';
import { mockReviews } from '@/lib/reviews';
import heroImage from '@/assets/hero-saree.jpg';
import { ShieldCheck, Award, Leaf, ArrowRight } from 'lucide-react';

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

        <div className="relative z-10 text-center text-white px-4 pt-24 sm:pt-32 max-w-5xl mx-auto">
          <h1
            ref={heroLogoRef}
            className="mx-auto mb-6 font-bold tracking-widest text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl will-change-transform leading-tight"
            style={{ transformOrigin: '50% 0%', pointerEvents: 'none', fontFamily: 'Cormorant Garamond, serif' }}
          >
            TAMARAVASTRA
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-4 opacity-90 font-light tracking-wide max-w-2xl mx-auto">
            Where Tradition Meets Timeless Elegance
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/catalogue">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-medium px-8 h-14 text-lg transition-all hover:scale-105 shadow-lg"
              >
                Shop Collection
              </Button>
            </Link>
            <Link to="/catalogue?category=party-wear">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white font-medium px-8 h-14 text-lg transition-all"
              >
                Explore Party Wear
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-70 hidden sm:block">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="h-24 bg-gradient-to-b from-primary/5 to-transparent" />

      {/* Bestsellers Section */}
      <section className="py-20 bg-background relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Our Bestsellers</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-4" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the pieces that our customers love the most. Each saree tells a story of craftsmanship and beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map(product => (
              <LazyReveal key={product.id}>
                <ProductCard product={product} />
              </LazyReveal>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/catalogue">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 h-12 text-lg group"
              >
                View Full Collection
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-24 bg-secondary overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent/30 rounded-lg z-0" />
              <img
                src="/hero-saree.jpg"
                alt="Weaving loom"
                className="relative z-10 rounded-lg shadow-xl w-full aspect-[4/3] object-cover"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">The Art of Weaving</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Tamaravastra, we act as connoisseurs of Indian heritage, meticulously selecting pieces that embody the pinnacle of craftsmanship. Our collection is a curated anthology of India's finest weaves, handpicked from the most esteemed looms across the country.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We bridge the gap between discerning admirers of art and the master artisans who create it. From the regal Zari of Banaras to the ethereal grace of Chanderi, each saree is chosen for its authenticity, quality, and the story it weaves.
              </p>
              <Link to="/about">
                <Button variant="link" className="text-accent text-lg p-0 hover:no-underline group">
                  Discover Our Process <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Curated Selections</h2>
            <p className="text-muted-foreground">Handpicked for the season</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <LazyReveal key={product.id}>
                <ProductCard product={product} />
              </LazyReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-secondary/50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Why Choose Tamaravastra?</h2>
            <div className="w-16 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-10 h-10 text-accent mb-4" />,
                title: 'Authentic Fabrics',
                desc: 'Sourced directly from trusted weavers and verified mills ensuring 100% authenticity.'
              },
              {
                icon: <Award className="w-10 h-10 text-accent mb-4" />,
                title: 'Quality Checked',
                desc: 'Every piece undergoes a rigorous multi-point inspection for weave, dye, and finish.'
              },
              {
                icon: <Leaf className="w-10 h-10 text-accent mb-4" />,
                title: 'Ethical Sourcing',
                desc: 'We support fair trade practices and ensure sustainable livelihoods for our artisans.'
              },
            ].map((item, i) => (
              <LazyReveal key={item.title}>
                <div className="p-8 border border-border/50 rounded-xl bg-background text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full flex flex-col items-center">
                  {item.icon}
                  <div className="text-xl font-serif font-semibold mb-3 text-primary">{item.title}</div>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
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
