import { About, Connect, ShoppingCart, Home, ProductDetail, Checkout, Points } from "./pages";
import { Eye, SEO } from "./components/organisms";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "share/redux/hook";
import { fetchPointData } from "share/redux/points";

function App() {
  const dispatch = useAppDispatch()
  const account = useAppSelector((state) => state.metamask.account);
  useEffect(() => {
    if (account) {
      dispatch(fetchPointData())
    }
    // eslint-disable-next-line
  }, [account])
  return (
    <div>
      <SEO />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-points" element={<Points />} />
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
