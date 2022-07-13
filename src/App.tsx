import React from "react";
import ProductDetails from "./components/ProductDetail/PDP";
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import NewNavbar from "./components/NavBar/NewNavBar";
import MyHome from "./components/Home/MyHome";
import CartPage from "./components/Cart/CartPage";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <NewNavbar />
      <Routes>
        {["/all", "/clothes", "/tech"].map((path) => (
          <Route path={path} key={path} element={<MyHome />} />
        ))}
        <Route path="/cart" element={<CartPage />} />
        <Route path={`/product/:productId`} element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/all" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

