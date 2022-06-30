import React from "react";
import { connect } from "react-redux";
import classes from "./CartItem.module.css";
import deleteIcon from "../Static/delete.svg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Price, Product } from "../../generated/newgenerated/graphql";
import {selectCartState, quantityIncrement, quantityDecrement} from '../../features/cart/cartSlice';

interface Props { 
  key: string,
  data: Product,
  price: Price,
}


export const CartItem: React.FC<Props> = ({data, price}) => {
  
  const myCartState = useAppSelector(selectCartState);
  // Quantity: ?
  const dispatch = useAppDispatch();


    return (
      <div className={classes.container}>
        <div className={classes.productDetails}>
          <div>
            <h4>{data.brand}</h4>
            <h3>{data.name}</h3>
            {price.currency && (
              <h4>
                {price.amount}
                {price.currency.symbol}
              </h4>
            )}
            <hr />
          </div>
              <span>
                 <div>
          {data.attributes?.map((attribute) => {
            return (
              <div key={attribute?.name}>
                <label key={attribute?.name}>
                  <b>{attribute?.name}</b>
                </label>
                <br />
                {attribute?.items?.map((finalItem) => {
                  return (
                    <button key={finalItem?.id}>
                      {finalItem?.displayValue}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
              </span>

          <h4>
            Total Price:
            {Math.floor(price.amount)}
            {price.currency.symbol}
          </h4>
        </div>

        <div className={classes.productShowCase}>
          <div className={classes.productQuantity}>
            <button onClick={()=> dispatch(quantityIncrement(1))}>+</button>
            <b>{myCartState.totalQuantity}</b>

            <button onClick={() => dispatch(quantityDecrement(1))}>-</button>
          </div>

          <img
            src={data.gallery![0]!}
            width="150"
            height="auto"
            alt="prod"
          />

          
        </div>
      </div>
    );
  }

export default CartItem;



