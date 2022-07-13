import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { checkOutCart, selectCartState } from "../../slices/cart/cartSlice";
import { selectCurrency } from "../../slices/currency/currencySlice";
import { NewProduct } from "../../generated/newgenerated/graphql";
import CartItem from "./CartItem";
import classes from "./CartPage.module.css";

const CartPage: React.FC = () => {
  const myCartState = useAppSelector(selectCartState);
  const myCartProducts = myCartState.cartProducts;
  const myCurrencyState = useAppSelector(selectCurrency);
  const dispatch = useAppDispatch();
  return (
    <div className={classes.container}>
      <div className={classes.pageName}>
        <h4>CART</h4>
      </div>
      <div className={classes.cartContainer}>
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
              slider={true}
            />
          );
        })}
      </div>
      <div className={classes.totalAmountContainer}>
        <div className={classes.productPrice}>
          <div className={classes.priceLabels}>
            <p>{`Tax 21%:`}</p>
            <p>{`Quantity:`}</p>
            <p>{`Total:`}</p>
          </div>
          <div className={classes.priceAmount}>
            <p>{`${myCurrencyState.activeSymbol}${Math.ceil(
              myCartState.cartTotalAmount * 0.21
            ).toFixed(2)}`}</p>
            <p>{myCartState.cartTotalQuantity}</p>

            <p>
              {`${
                myCurrencyState.activeSymbol
              }${myCartState.cartTotalAmount.toFixed(2)}`}
            </p>
          </div>
        </div>
        <div>
          <button
            className={classes.orderButton}
            onClick={() => dispatch(checkOutCart(null))}
          >
            order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
