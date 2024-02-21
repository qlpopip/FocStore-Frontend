import { About, Connect, ShoppingCart, Home, ProductDetail, Checkout } from "./pages";
import { Eye, SEO } from "./components/organisms";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <SEO />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<Eye />} />
      </Routes>
    </div>
  );
}

export default App;
