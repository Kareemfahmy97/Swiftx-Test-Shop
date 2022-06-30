import React, { useState } from "react";
import { connect } from "react-redux";
import CartItem from "./CartItem";
import classes from "./MiniCart.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import {  selectCartState } from "../../features/cart/cartSlice";
import { selectCurrency } from "../../features/currency/currencySlice";


export const MiniCart: React.FC = () => {
    
    // My data here passing wrong type so my attributes won't be visible
    
    const [toggleMyCart, setToggleMyCart] = useState(false);
    const toggleCart = () => {
      setToggleMyCart((prevState) => !prevState);
    };


  const myCartState = useAppSelector(selectCartState);
  const myCurrencyState = useAppSelector(selectCurrency);
  

var totalPrices: Number[]= [] ;
    return (
      <div className={classes.backdrop} onClick={() => toggleCart()}>
        <div className={classes.minibag}>
          <h1 style={{ textAlign: "center" }}>
            {myCartState.totalQuantity} items
          </h1>


          <div className={classes.items}>
            {myCartState.products.map((item) => {
              const currentCurrencyPrice = item.prices.find(
                (currency) => currency.currency.label === myCurrencyState.activeCurrency
              );
                
              totalPrices.push(
                Math.ceil(currentCurrencyPrice?.amount! )
              );

              return (
                <CartItem
                  key={item.id}
                  price={currentCurrencyPrice!}
                  data={item}
                  
                />
              );
            })}
          </div>

          <h2 style={{ textAlign: "center" }}>
            {/* Total Price: {totalPrices.reduce((prev:number, nxt:number) => prev + nxt, 0)} */}
            {myCurrencyState.activeCurrency}
          </h2>

          <div className={classes.buttonContainer}>
       
            <button className={classes.showFullCart}>View Bag</button>
            <button className={classes.checkOut}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }



export default MiniCart;
