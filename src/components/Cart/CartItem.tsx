import React, { useState } from "react";
import classes from "./CartItem.module.css";
import { useAppDispatch } from "../../hooks";
import { Price, NewProduct } from "../../generated/newgenerated/graphql";
import {
  quantityIncrement,
  quantityDecrement,
} from "../../slices/cart/cartSlice";

interface Props {
  key: string;
  data: NewProduct;
  price: Price;
  id: string;
  myCartProducts: NewProduct[];
  myIndex: number;
  slider: boolean;
}
export const CartItem: React.FC<Props> = ({
  data,
  price,
  id,
  myCartProducts,
  slider,
  myIndex,
}) => {
  const dispatch = useAppDispatch();
  const currentProduct = myCartProducts.find(
    (item: NewProduct) => item.id === id
  );
  const [selectedButton, setSelectedButton] = useState<string[]>([""]);
  const [quantityOfImages, setQuantityOfImages] = useState(0);
  const handleSelected = (event: string) => {
    if (!selectedButton.includes(event)) {
      let splittedAttribute = event.split("+")[0];
      let attributeExist = selectedButton.some(
        (element) => element.split("+")[0] === splittedAttribute
      );
      if (attributeExist) {
        const myRepeatedCategory = selectedButton.filter(
          (s) => s.split("+")[0] !== splittedAttribute
        );
        setSelectedButton([...myRepeatedCategory, event]);
      } else {
        setSelectedButton((prevSelected) => [...prevSelected, event]);
      }
    }
  };

  const galleryLength = data.gallery?.length!;
  const nextImgHandler = () => {
    if (quantityOfImages >= galleryLength - 1) {
      setQuantityOfImages(0);
    }
    setQuantityOfImages((prevState) => prevState + 1);
  };
  const prevImgHandler = () => {
    if (quantityOfImages <= 0) {
      setQuantityOfImages(galleryLength - 1);
    }
    setQuantityOfImages((prevState) => prevState - 1);
  };
  return (
    <div className={classes.container}>
      <div className={classes.productDetails}>
        <div className={classes.productName}>
          <p>
            {data.brand}
            <br />
            {data.name}
          </p>
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
      </div>

      <div className={classes.productShowCase}>
        {slider && galleryLength > 1 && (
          <div className={classes.sliders}>
            <button onClick={() => prevImgHandler()}> {"<"} </button>
            <button onClick={() => nextImgHandler()}> {">"} </button>
          </div>
        )}
        <div className={classes.productQuantity}>
          <button onClick={() => dispatch(quantityIncrement(id))}>+</button>
          <b>{currentProduct?.productTotalQuantity}</b>

          <button onClick={() => dispatch(quantityDecrement(id))}>-</button>
        </div>

        <img
          src={`${slider ? data.gallery![quantityOfImages]! : data.image}`}
          alt="sliders"
        />
      </div>
    </div>
  );
};

export default CartItem;
