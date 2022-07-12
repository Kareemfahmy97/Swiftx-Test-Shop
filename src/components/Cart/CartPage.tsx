import React from "react";
import { classicNameResolver } from "typescript";
import { useAppSelector } from "../../app/hooks";
import { selectCartState } from "../../features/cart/cartSlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { NewProduct } from "../../generated/newgenerated/graphql";
import CartItem from "./CartItem";
import classes from './CartPage.module.css';



const CartPage: React.FC  = () =>   {

const myCartState = useAppSelector(selectCartState);
const myCartProducts =  myCartState.cartProducts;
const myCurrencyState = useAppSelector(selectCurrency)

    return (
      <div style={{ padding: "10px 10%" }}>
      {/* <div className={classes.container}> */}
        <div
          style={{ height: "70vh", overflowX: "hidden", overflow: "scroll", scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
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
                price={currentCurrencyPrice!}
                myIndex={index}
                myCartProducts={myCartProducts}
              />
            );
          })}
        </div>

        <div
          style={{ textAlign: "left", margin: "20px auto" }}
          // className={classes.productShowCase}
        >
          <h2>{`Taxes: ${Math.ceil(myCartState.cartTotalAmount * 0.21).toFixed(
            2
          )}%`}</h2>
          <h2>{myCartState.cartTotalQuantity} Items</h2>

          <h2>
            Total Price:
            {myCartState.cartTotalAmount.toFixed(2)}
            {myCurrencyState.activeCurrency}
          </h2>
        </div>
      </div>
    );
  
}



export default (CartPage);
