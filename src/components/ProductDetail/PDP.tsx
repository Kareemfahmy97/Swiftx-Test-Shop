import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategory } from "../../features/categories/categorySlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { PdpQuery } from "../../generated/graphql";
import { useEffect } from "react";
import { addItemToCart } from "../../features/cart/cartSlice";
import { useLocation } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../generated/newgenerated/graphql";
import { selectProduct, setActiveProductId } from "../../features/products/productSlice";
import "./styles.css";



const ProductDetails: React.FC = () => {
  const location = useLocation();
  const productIdFromLocation = location.pathname.split("/")[2];
  console.log(productIdFromLocation);
  const dispatch = useAppDispatch();
  const myCurrencyState = useAppSelector(selectCurrency);
  // const dispatch = useAppDispatch();
  const myProductState = useAppSelector(selectProduct);
  const {
    data: dataProductById,
    error: errorProductById,
    loading: loadingProudctById,
    refetch,
  } = useFetchProductByIdQuery({
    variables: { id: String(productIdFromLocation) },
  });

  useEffect(() => {
    refetch({ id: String(productIdFromLocation) });
  }, [refetch, productIdFromLocation]);
  // useEffect(() => {
  //   dispatch(setActiveProductId(productIdFromLocation));
  // }, []);


  if (loadingProudctById) {
    return <div>Loading...</div>;
  }

  if (errorProductById || !dataProductById) {
    return <div>ERROR No Products Available</div>;
  }

  let attributeName = "";
  let attributeType = "";
  let myValuesArr: string[] = [];
  const productAttributes = dataProductById.product?.attributes;

  const filtering = productAttributes?.map((item) => {
    return (
      (attributeName = item?.name!),
      (attributeType = item?.type!),
      item?.items?.map((myitem, i) => myValuesArr.push(myitem?.displayValue!))
    );
  });

  
  // I have better solution for this part
  return (
    <main>
      <section id="grid">
        <div id="product-imgs">
          {dataProductById.product?.gallery?.map((image, index) => {
            if (index === 0) {
            } else {
              return (
                <div className="img-select">
                  <img
                    src={image!}
                    className="img-item"
                    key={image}
                    alt={dataProductById.product?.name}
                    width="100%"
                    height="100%"
                  />
                </div>
              );
            }
          })}
        </div>

        <div className="box">
          {dataProductById.product?.gallery?.map((image, index) => {
            if (index === 0) {
              return (
                <div className="box">
                  <img
                    src={image!}
                    alt={dataProductById.product?.name}
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
          <div>
            <h2>{dataProductById.product?.brand}</h2>
            <p>{dataProductById.product?.name}</p>
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
          {dataProductById.product?.prices?.map((price) => {
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
          <button className="addtoCart">Add to cart</button>
        </div>
        <div
          className="box"
          dangerouslySetInnerHTML={{ __html: dataProductById.product?.description! }}
        ></div>
      </section>
    </main>
  );
};

export default ProductDetails;
