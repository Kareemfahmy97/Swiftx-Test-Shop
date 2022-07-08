import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectCartState } from "../../features/cart/cartSlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { NewProduct } from "../../generated/newgenerated/graphql";
import CartItem from "./CartItem";




const CartPage: React.FC  = () =>   {

const myCartState = useAppSelector(selectCartState);
const myCartProducts =  myCartState.cartProducts;
const myCurrencyState = useAppSelector(selectCurrency)

    return (
      <div style={{ padding: "10px 10%" }}>
        <div
          style={{ height: "70vh", overflowX: "hidden", overflowY: "scroll" }}
        >
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

        <div style={{ textAlign: "center", margin: "20px auto" }}>
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
