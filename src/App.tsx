import React, { useEffect } from 'react';
import './App.css';
import ProductDetails from './components/ProductDetail/PDP';
import {  BrowserRouter, Route, Router,Navigate, Routes, useLocation } from "react-router-dom";

import NewNavbar from './components/NavBar/NewNavBar';
import MyHome from './components/Home/MyHome';
import { useAppSelector } from "./app/hooks";
import { selectProduct } from "./features/products/productSlice";
import MiniCart from './components/Cart/MiniCart';
import CartPage from './components/Cart/CartPage';

const App:React.FC = () => {

  // const [id, setId] = React.useState("apple-iphone-12-pro");
  // const handleIdChange = React.useCallback((newId: any) => {
  //   setId(newId);
  // }, []);
  useEffect(()=>{
    
  },[Navigate])
  return (
    <BrowserRouter>
      <NewNavbar />
      <Routes>

        {[ "/all", "/clothes", "/tech"].map((path) => (
          <Route path={path} key={path} element={<MyHome />} />
        ))}
        <Route path="/cart" element={<CartPage />}/>
        <Route
          path={`/product/:productId`}
          element={<ProductDetails />}
        />
           <Route
        path="*"
        element={<Navigate to="/all" replace />}
    />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

















    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //     </span>
    //   </header>
    // <MyProducts />