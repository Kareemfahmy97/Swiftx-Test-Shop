import React from "react";
import classes from "./CartItem.module.css";
import { useAppDispatch } from "../../app/hooks";
import { Price, NewProduct } from "../../generated/newgenerated/graphql";
import { quantityIncrement, quantityDecrement} from '../../features/cart/cartSlice';

interface Props { 
  key: string,
  data: NewProduct,
  price: Price,
  id: string;
  myCartProducts: NewProduct[];
}

export const CartItem: React.FC<Props> = ({data, price, id, myCartProducts}) => {
  
  // const myCartState = useAppSelector(selectCartState);
  // Quantity: ?
  const dispatch = useAppDispatch();
  const currentProduct = myCartProducts.find((item: NewProduct) => item.id === id);
    return (
      <div className={classes.container}>
        <div className={classes.productDetails}>
          <div>
            <h4>{data.brand}</h4>
            <h3>{data.name}</h3>
            {price.currency && (
              <h4>
                {Math.ceil(price.amount).toFixed(2)}
                {price.currency.symbol}
              </h4>
            )}
            <hr />
          </div>
          <span>
            <div>
              {currentProduct!.attributes?.map((attribute) => {
                return (
                  <div key={attribute?.name}>
                    <label key={attribute?.name}>
                      <b>{attribute?.name}</b>
                    </label>
                    <br />
                    {attribute?.items?.map((finalItem) => {
                      if(attribute.type === 'swatch'){
                        return (
                          <button key={finalItem?.id} style={{backgroundColor: `${finalItem?.value}`, height:'20px', width:'30px'}}>

                          </button>
                        );
                      }
                      return (
                        <button key={finalItem?.id}>
                          {finalItem?.value}
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
            {Math.ceil(
              currentProduct?.productTotalQuantity! *
                currentProduct?.currentPrice.amount!
            )}
            
            {price.currency.symbol}
          </h4>
        </div>

        <div className={classes.productShowCase}>
          <div className={classes.productQuantity}>
            <button onClick={() => dispatch(quantityIncrement(id))}>+</button>
            <b>{currentProduct?.productTotalQuantity}</b>

            <button onClick={() => dispatch(quantityDecrement(id))}>-</button>
          </div>

          <img src={data.image} width="150" height="auto" alt="prod" />
        </div>
      </div>
    );
  }

export default CartItem;



