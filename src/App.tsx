import { About, Connect, ShoppingCart, Home, ProductDetail, Checkout, Points, Swap, DailyCheckIn, WifiPoint, Event, EventDetail, Orders } from "./pages";
import { Eye, SEO } from "./components/organisms";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <SEO />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-points" element={<Points />} />
        <Route path="/swap-points" element={<Swap />} />
        <Route path="/daily-check-in" element={<DailyCheckIn />} />
        <Route path="/wifi-point" element={<WifiPoint />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<Eye />} />
      </Routes>
    </div>
  );
}

export default App;
