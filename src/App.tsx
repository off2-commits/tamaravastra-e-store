import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./lib/cart-context";
import { Navigation } from "./components/Navigation";
import Landing from "./pages/Landing";
import Catalogue from "./pages/Catalogue";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Admin from "./pages/Admin";
import AdminOrderDetail from "./pages/AdminOrderDetail";
import AdminProductEdit from "./pages/AdminProductEdit";
import AdminCoupons from "./pages/AdminCoupons";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { useEffect } from "react";
import ReplacementPolicy from "./pages/ReplacementPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ReplacementRequest from "./pages/ReplacementRequest";
import { Footer } from "./components/Footer";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <Navigation />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:orderId" element={<OrderConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy/replacement" element={<ReplacementPolicy />} />
        <Route path="/policy/shipping" element={<ShippingPolicy />} />
        <Route path="/policy/terms" element={<Terms />} />
        <Route path="/policy/privacy" element={<Privacy />} />
        <Route path="/replacement-request" element={<ReplacementRequest />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/order/:orderId" element={<AdminOrderDetail />} />
        <Route path="/admin/product/:productId" element={<AdminProductEdit />} />
        <Route path="/admin/coupons" element={<AdminCoupons />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
