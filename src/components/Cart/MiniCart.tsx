import React, { useState } from "react";
import CartItem from "./CartItem";
import classes from "./MiniCart.module.css";
// import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkOutCart, selectCartState } from "../../features/cart/cartSlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { NewProduct } from "../../generated/newgenerated/graphql";
import { Link } from "react-router-dom";

interface Props {
  myCartProducts: NewProduct[];
  cartOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MiniCart: React.FC<Props> = ({ myCartProducts, cartOpened }) => {
  // My data here passing wrong type so my attributes were not visible
  // Edit them successfully 

  const dispatch = useAppDispatch();
  const myCurrencyState = useAppSelector(selectCurrency);
  const myCartState = useAppSelector(selectCartState);
  

  return (
    <div className={classes.toggleCart}>
        <div className={classes.bagItems}>
          {`My Bag: ${myCartState.cartTotalQuantity} ${myCartState.cartTotalQuantity>1 ? 'items' : 'item'}`}
        </div>
      <div className={classes.minibag}>
        {myCartProducts.map((item: NewProduct, index) => {
          const currentCurrencyPrice = item.prices.find(
            (currency) =>
              currency.currency.label === myCurrencyState.activeCurrency
          );

          return (
            <CartItem
              key={item.id}
              id={item.id}
              data={item}
              myIndex={index}
              price={currentCurrencyPrice!}
              myCartProducts={myCartProducts}
            />
          );
        })}
      </div>
      <div className={classes.priceSection}>
        <p>Total</p>
        <p>
          {myCurrencyState.activeSymbol}
          {myCartState.cartTotalAmount.toFixed(2)}
        </p>
      </div>

      <div className={classes.buttonContainer}>
        <Link to="/cart" >
          <button
            className={classes.showFullCart}
            onClick={() => cartOpened(false)}
            disabled={myCartState.cartProducts.length===0}
          >
            View Bag
          </button>
        </Link>
        <button className={classes.checkOut} onClick={() => {cartOpened(false); dispatch(checkOutCart(null)) }}>
          Check out
        </button>
      </div>
    </div>
  );
};

export default MiniCart;
