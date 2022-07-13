import React from "react";
import { classicNameResolver } from "typescript";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { checkOutCart, selectCartState } from "../../features/cart/cartSlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { NewProduct } from "../../generated/newgenerated/graphql";
import CartItem from "./CartItem";
import  classes from './CartPage.module.css';



const CartPage: React.FC  = () =>   {

const myCartState = useAppSelector(selectCartState);
const myCartProducts =  myCartState.cartProducts;
const myCurrencyState = useAppSelector(selectCurrency)
const dispatch = useAppDispatch();
    return (
      <div style={{ padding: "80px 10%" }}>
      {/* <div className={classes.container}> */}
      <div className="firstSection">
      <h4>CART</h4>
      </div>
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
          <div className="thirdSection">
        <div
          style={{ textAlign: "left", margin: "20px auto" }}
          // className={classes.productShowCase}
        >
          <h2>{`Tax 21%: ${Math.ceil(myCartState.cartTotalAmount * 0.21).toFixed(
            2
          )}%`}</h2>
          <h2>Quantity: {myCartState.cartTotalQuantity}</h2>

          <h2>
            {`Total: ${myCartState.cartTotalAmount.toFixed(2)}${myCurrencyState.activeCurrency}`}
          </h2>
        </div>
        <div>
            <button className={classes.orderButton} onClick={()=> dispatch(checkOutCart(null))}>order</button>
        </div>

          </div>
      </div>
    );
  
}



export default (CartPage);
