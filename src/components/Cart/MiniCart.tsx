import React, { useState } from "react";
import CartItem from "./CartItem";
import classes from "./MiniCart.module.css";
// import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCartState } from "../../features/cart/cartSlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { NewProduct } from "../../generated/newgenerated/graphql";
import { Link } from "react-router-dom";

interface Props {
  myCartProducts: NewProduct[];
  cartOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MiniCart: React.FC<Props> = ({ myCartProducts, cartOpened }) => {
  // My data here passing wrong type so my attributes won't be visible

  const [toggleMyCart, setToggleMyCart] = useState(false);

  const toggleCart = () => {
    setToggleMyCart(prevState => !prevState);
    
  };
  // console.log(cartOpened); 
  const myCurrencyState = useAppSelector(selectCurrency);
  const myCartState = useAppSelector(selectCartState);


  return (
    <div >
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


            return (
              <CartItem
                key={item.id}
                id={item.id}
                data={item}
                price={currentCurrencyPrice!}
                myCartProducts={myCartProducts}
              />
            );
          })}
        </div>

        <h2 style={{ textAlign: "center" }}>
          Total Prices: 
          {myCartState.cartTotalAmount.toFixed(2)}
          {myCurrencyState.activeCurrency}
        </h2>

        <div className={classes.buttonContainer}>
          <Link to="/cart" >
            <button
              className={classes.showFullCart}
              onClick={() => cartOpened(false)}
            >
              View Bag
            </button>
          </Link>
          <button className={classes.checkOut} onClick={() => cartOpened(false)}>Checkout</button>
          

        </div>
      </div>
    </div>
  );
};

export default MiniCart;
