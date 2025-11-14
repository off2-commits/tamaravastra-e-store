import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

export function Navigation() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/catalogue', label: 'Sarees' },
    { to: '/catalogue?category=silk', label: 'Silk' },
    { to: '/catalogue?category=cotton', label: 'Cotton' },
    { to: '/catalogue?sale=true', label: 'Sale' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-transparent group">
              <Menu className="h-5 w-5 group-hover:text-accent transition-smooth" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-lg hover:text-accent transition-smooth"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo - centered, appears on scroll */}
        <Link to="/" className={`flex items-center absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <h1 className="text-2xl font-bold tracking-wider">TAMARAVASTRA</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm hover:text-accent transition-smooth"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-transparent group">
            <Search className="h-5 w-5 group-hover:text-accent transition-smooth" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-transparent group">
            <User className="h-5 w-5 group-hover:text-accent transition-smooth" />
          </Button>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-transparent group">
              <ShoppingBag className="h-5 w-5 group-hover:text-accent transition-smooth" />
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
  );
}
