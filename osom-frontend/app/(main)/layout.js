import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "./components/CartContext";
import CartOverlay from "./components/CartOverlay";
import { ProductProvider } from "./components/ProductContext"; // 👈

export default function MainLayout({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider> {/* 👈 Wrap everything */}
          <NavigationBar />
          {children}
          <Footer />
          <CartOverlay />
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
