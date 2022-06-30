import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategory } from "../../features/categories/categorySlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { PdpQuery } from "../../generated/graphql";
import { addItemToCart } from "../../features/cart/cartSlice";
import "./styles.css";

interface Props {
  data: PdpQuery;
}

const className = "ProductDetails";
const ProductDetails: React.FC<Props> = ({ data }) => {

  const myCurrencyState = useAppSelector(selectCurrency);
  const dispatch = useAppDispatch();
    if (!data.product) {
    return <div>No Products available</div>;
  }
  let attributeName = '';
  let attributeType = '';
  let myValuesArr: string[] = [];
  const productAttributes = data.product.attributes;

  const filtering = productAttributes?.map((item)=> {
    return (
        attributeName = item?.name!,
        attributeType = item?.type!,
        item?.items?.map((myitem, i)=> myValuesArr.push((myitem?.displayValue!)))
        
  )

});

 // I have better solution for this part 
  return (
    <main>
      <section id="grid">
        <div id="product-imgs">
          {data.product?.gallery?.map((image, index) => {
            if (index === 0) {
            } else {
              return (
                <div className="img-select">
                  <img
                    src={image!}
                    className="img-item"
                    key={image}
                    width="100%"
                    height="100%"
                  />
                </div>
              );
            }
          })}
        </div>

        <div className="box">
          {data.product?.gallery?.map((image, index) => {
            if (index === 0) {
              return (
                <div className="box">
                  <img src={image!} key={image} width="100%" height="100%" />
                </div>
              );
            }
          })}
        </div>
        <div className="box">
          <div>
            <h2>{data.product.brand}</h2>
            <p>{data.product.name}</p>
          </div>
        </div>
        <div className="box">
          {productAttributes?.map((item) => {
            if (item?.type === "swatch") {
            }
            return (
              <div key={item?.name}>
                <label key={item?.name}>
                  <b>{item?.name}</b>
                </label>
                <br />
                {item?.items?.map((finalItem) => {
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

        <div className="box">
          {data.product.prices?.map((price) => {
            if (price.currency.label === myCurrencyState.activeCurrency) {
              return (
                <div className="prices">
                  <p>
                    <b>PRICE:</b>
                  </p>
                  <h4>
                    <b>
                      {price.currency.symbol}
                      {`${price.amount.toFixed()}`}
                      <br />
                    </b>

                    <label key={price.amount}></label>
                  </h4>
                </div>
              );
            }
          })}
        </div>
        <div className="box">
          <button
            className="addtoCart"
            onClick={() => dispatch(addItemToCart(data.product))}
          >
            Add to cart
          </button>
        </div>
        <div
          className="box"
          dangerouslySetInnerHTML={{ __html: data.product.description }}
        ></div>
      </section>
    </main>

  );
};

export default ProductDetails;
