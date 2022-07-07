import React, { useState } from "react";
import CartItem from "./CartItem";
import classes from "./MiniCart.module.css";
// import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import {  selectCartState } from "../../features/cart/cartSlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { NewProduct } from "../../generated/newgenerated/graphql";


interface Props{
  myCartProducts: NewProduct[];
}


export const MiniCart: React.FC<Props> = ({myCartProducts}) => {
    
    // My data here passing wrong type so my attributes won't be visible
    
    const [toggleMyCart, setToggleMyCart] = useState(false);
    const toggleCart = () => {
      setToggleMyCart((prevState) => !prevState);
    };


  const myCurrencyState = useAppSelector(selectCurrency);
  const myCartState = useAppSelector(selectCartState);

var totalPrices: Number[]= [] ;
    return (
      <div className={classes.backdrop} onClick={() => toggleCart()}>
        <div className={classes.minibag}>
          <h1 style={{ textAlign: "center" }}>
            {myCartState.cartTotalQuantity} items
          </h1>
          <div className={classes.items}>
            {myCartProducts.map((item: NewProduct) => {
              const currentCurrencyPrice = item.prices.find(
                (currency) =>
                  currency.currency.label === myCurrencyState.activeCurrency
              );

              totalPrices.push(Math.ceil(currentCurrencyPrice?.amount!));

              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  data={item}
                  price={currentCurrencyPrice!}
                  myCartProducts= {myCartProducts}
                />
              );
            })}
          </div>

          <h2 style={{ textAlign: "center" }}>
            {(myCartState.cartTotalAmount).toFixed(2)}
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
