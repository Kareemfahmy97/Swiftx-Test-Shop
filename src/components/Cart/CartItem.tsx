import React, { useState, useRef } from "react";
import classes from "./CartItem.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Price, NewProduct } from "../../generated/newgenerated/graphql";
import {
  quantityIncrement,
  quantityDecrement,
} from "../../features/cart/cartSlice";
import { selectCurrency } from "../../features/currency/currencySlice";

interface Props {
  key: string;
  data: NewProduct;
  price: Price;
  id: string;
  myCartProducts: NewProduct[];
  myIndex: number;
}
export const CartItem: React.FC<Props> = ({
  data,
  price,
  id,
  myCartProducts,
  myIndex,
}) => {
  // const myCurrencyState = useAppSelector(selectCurrency);

  // Quantity: ?
  const dispatch = useAppDispatch();
  const currentProduct = myCartProducts.find(
    (item: NewProduct) => item.id === id
  );
  const [selectedButton, setSelectedButton] = useState<string[]>([""]);

  const handleSelected = (event: string) => {
    if (!selectedButton.includes(event)) {
      let splittedAttribute = event.split("+")[0];
      let attributeExist = selectedButton.some((element) => element.split('+')[0] === splittedAttribute);
        if(attributeExist){
          const myRepeatedCategory = selectedButton.filter(s=> s.split('+')[0] !== splittedAttribute);
      setSelectedButton([...myRepeatedCategory, event]);
        }else{
        setSelectedButton((prevSelected) => ([...prevSelected, event]));
        }
    }

  };

  return (
    <div className={classes.container}>
      <div className={classes.productDetails}>
        <div className={classes.productName}>
          <span>
            {data.brand}
            <br />
            {data.name}
          </span>
          {price.currency && (
            <h4>
              {price.currency.symbol}
              {Math.ceil(price.amount).toFixed(2)}
            </h4>
          )}
        </div>

        <div>
          {currentProduct!.attributes?.map((attribute) => {
            return (
              <div key={attribute?.name}>
                <label key={attribute?.name} htmlFor={`${attribute?.id} `}>
                  <b>{`${attribute?.name}:`}</b>
                </label>
                <br />
                {attribute?.items?.map((finalItem) => {
                  return (
                    <button
                      key={finalItem?.id}
                      value={finalItem?.value!}
                      onClick={() => {
                        handleSelected(`${attribute.id}+${finalItem?.id}`);
                      }}
                      // onFocus={() => handleFocus()}
                      className={
                        attribute.type === "swatch"
                          ? `${classes.swatchButton} ${
                              selectedButton.includes(
                                `${attribute.id}+${finalItem?.id}`
                              )
                                ? classes.selectedSwatchButton
                                : ""
                            }`
                          : `${classes.attributesButton} ${
                              selectedButton.includes(
                                `${attribute.id}+${finalItem?.id}`
                              )
                                ? classes.selectedAttributeButton
                                : ""
                            }`
                      }
                      style={
                        attribute.type === "swatch"
                          ? {
                              backgroundColor: `${finalItem?.value}`,
                              border: `1px solid ${
                                finalItem?.id === "White"
                                  ? "Black"
                                  : finalItem?.value
                              }`,
                              
                            }
                          : undefined
                      }
                    >
                      {attribute.type === "swatch" ? "" : finalItem?.value}
                    </button>
                    // </>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* <h4>

            {`Total Price: ${price.currency.symbol}${Math.ceil(
              currentProduct?.productTotalQuantity! *
                productCurrentPrices?.amount!
            )}`}
          </h4> */}
      </div>

      <div className={classes.productShowCase}>
        <div className={classes.productQuantity}>
          <button onClick={() => dispatch(quantityIncrement(id))}>+</button>
          <b>{currentProduct?.productTotalQuantity}</b>

          <button onClick={() => dispatch(quantityDecrement(id))}>-</button>
        </div>

        <img src={data.image} alt="prod" />
      </div>
    </div>
  );
};

export default CartItem;
