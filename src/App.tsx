import React from 'react';
import './App.css';
import ProductDetails from './components/ProductDetail';
import './App.css';
import {  BrowserRouter, Route, Router, Routes } from "react-router-dom";

import NewNavbar from './components/NavBar/NewNavBar';
import MyHome from './components/Home/MyHome';
import { useAppSelector } from "./app/hooks";
import { selectProduct } from "./features/products/productSlice";
import MiniCart from './components/Cart/MiniCart';

const App:React.FC = () => {
  const myProductState = useAppSelector(selectProduct);
  const myCurrentId = myProductState.currentProductId;
 
  // const [id, setId] = React.useState("apple-iphone-12-pro");
  // const handleIdChange = React.useCallback((newId: any) => {
  //   setId(newId);
  // }, []);
  return (
    <BrowserRouter>
      <NewNavbar />
      <Routes>
        <Route path="/" element={<MyHome />} />
      
        <Route
          path={`/product/${myCurrentId}`}
          element={<ProductDetails id={myCurrentId} />}
        />
      </Routes>
      {/* <Navbarito /> */}
      <MyHome />
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