import { Link, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { SearchDialog } from '@/components/SearchDialog';
import { useState, useEffect, useRef } from 'react';

export function Navigation() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const scrollYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
  const debounceTimerRef = useRef<number | null>(null);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [logoVisible, setLogoVisible] = useState(!isLandingPage);
  // Logo visibility: landing page only reveals after scrolling past hero
  const isTransparent = isLandingPage && !logoVisible;

  useEffect(() => {
    const handleScroll = () => {
      // Debounce scroll work for performance (100ms)
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = window.setTimeout(() => {
        const currentY = window.scrollY;
        const delta = currentY - scrollYRef.current;
        scrollYRef.current = currentY;

        setIsScrolled(currentY > 100);

        // Reveal banner when scrolling down; hide when scrolling up
        if (delta > 0) {
          setIsBannerVisible(true);
        } else if (delta < 0) {
          setIsBannerVisible(false);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (debounceTimerRef.current) window.clearTimeout(debounceTimerRef.current);
    };
  }, []);

  // IntersectionObserver to toggle header logo visibility only on Landing page
  useEffect(() => {
    if (!isLandingPage) {
      setLogoVisible(true);
      return;
    }
    const hero = document.getElementById('hero-section');
    if (!hero) {
      setLogoVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setLogoVisible(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isLandingPage]);

  // Product category links (hamburger menu)
  const categoryLinks = [
    { to: '/catalogue', label: 'Sarees' },
    { to: '/catalogue?category=silk', label: 'Silk' },
    { to: '/catalogue?category=cotton', label: 'Cotton' },
    { to: '/catalogue?sale=true', label: 'Sale' },
  ];

  // Top-level page links (desktop header)
  const pageLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b ${
          isTransparent
            ? 'border-transparent bg-transparent backdrop-blur-0 supports-[backdrop-filter]:bg-transparent text-white'
            : 'border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        }`}
        aria-label="Main site header"
      >
      <div className="container-custom flex h-16 items-center">
        {/* Mobile/Tablet Menu */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`hover:bg-transparent group ${isTransparent ? 'text-white' : ''}`}
              aria-label="Open categories menu"
              aria-expanded={isSheetOpen}
              aria-controls="category-menu"
            >
              <Menu className={`h-5 w-5 transition-smooth ${isTransparent ? 'text-white' : ''} group-hover:text-accent`} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64" id="category-menu" aria-label="Product categories">
            <SheetHeader>
              <SheetTitle>Browse Categories</SheetTitle>
              <SheetDescription>Select a category to view products</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 mt-6">
              {categoryLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsSheetOpen(false)}
                  className={`px-4 py-3 text-lg font-medium rounded-lg transition-smooth hover:text-accent hover:bg-accent/10`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 border-t border-border pt-4">
              <nav className="flex flex-col gap-1">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About Us' },
                  { to: '/contact', label: 'Contact Us' },
                ].map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsSheetOpen(false)}
                    className="px-4 py-3 text-lg font-medium rounded-lg transition-smooth hover:text-accent hover:bg-accent/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Centered Logo in header; hidden on landing until past hero */}
        <Link
          to="/"
          className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-200 ${logoVisible ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={!logoVisible}
          aria-label="Home"
          style={{ willChange: 'opacity' }}
        >
          <h1 className="text-2xl font-bold tracking-wider">TAMARAVASTRA</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 ml-8">
          {pageLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-smooth relative group ${
                isTransparent ? 'text-white hover:text-white/90' : 'hover:text-accent'
              }`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <div className={`hidden md:block ${isTransparent ? 'text-white' : ''}`}>
            <SearchDialog />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`hover:bg-transparent group hidden md:inline-flex ${isTransparent ? 'text-white' : ''}`}
            aria-label="User profile"
          >
            <User className={`h-5 w-5 transition-smooth ${isTransparent ? 'text-white' : ''} group-hover:text-accent`} />
          </Button>
          <Link to="/cart">
            <Button
              variant="ghost"
              size="icon"
              className={`relative hover:bg-transparent group ${isTransparent ? 'text-white' : ''}`}
              aria-label="Open cart"
            >
              <ShoppingBag className={`h-5 w-5 transition-smooth ${isTransparent ? 'text-white' : ''} group-hover:text-accent`} />
              {totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
    {/* Removed overlay moving hero logo to restore previous simple behavior */}
    </>
  );
}
