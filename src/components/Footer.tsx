import { Link, useLocation } from 'react-router-dom';

export function Footer() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  if (isAdminPage) return null;
  return (
    <footer className="border-t border-border/40 bg-background text-sm">
      <div className="container-custom py-8 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center justify-between">
        <div className="space-y-1">
          <div className="font-semibold tracking-wider">TAMARAVASTRA</div>
          <p className="text-muted-foreground">Curated Ethnic Sarees</p>
        </div>
        <nav className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Link to="/replacement-request" className="hover:text-accent">Request Replacement</Link>
          <Link to="/policy/cancellation-return" className="hover:text-accent">Cancellation & Return</Link>
          <Link to="/policy/replacement" className="hover:text-accent">Replacement Policy</Link>
          <Link to="/policy/shipping" className="hover:text-accent">Shipping Policy</Link>
          <Link to="/policy/terms" className="hover:text-accent">Terms & Conditions</Link>
          <Link to="/policy/privacy" className="hover:text-accent">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}