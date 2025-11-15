import { Link } from 'react-router-dom';
import { User, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { SearchDialog } from '@/components/SearchDialog';
import { useState, useEffect } from 'react';

export function Navigation() {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
    <>
      {/* Free Shipping Banner */}
      <div className="bg-foreground py-2 w-full relative z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] text-center">
          <p className="text-background text-sm font-medium">
            Free standard shipping on all orders!
          </p>
        </div>
      </div>
      <header className="sticky top-10 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center">
        {/* Mobile/Tablet Menu */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-transparent group">
              <Menu className="h-5 w-5 group-hover:text-accent transition-smooth" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col gap-1 mt-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsSheetOpen(false)}
                  className="px-4 py-3 text-lg font-medium hover:text-accent hover:bg-accent/10 rounded-lg transition-smooth"
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
        <nav className="hidden lg:flex items-center gap-8 flex-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium hover:text-accent transition-smooth relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <SearchDialog />
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
    </>
  );
}
