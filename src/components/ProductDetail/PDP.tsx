import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCategory } from "../../features/categories/categorySlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { PdpQuery } from "../../generated/graphql";
import { useEffect, useState } from "react";
import { addItemToCart } from "../../features/cart/cartSlice";
import { useLocation } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../generated/newgenerated/graphql";
import {
  selectProduct,
  setActiveProductId,
} from "../../features/products/productSlice";
import "./styles.css";

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const productIdFromLocation = location.pathname.split("/")[2];
  console.log(productIdFromLocation);
  const dispatch = useAppDispatch();
  const [myMainImage, setMyMainImage] = useState("");

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
  const changeMainImage = (image: string) => {
    setMyMainImage(image);
  };
  let attributeName = "";
  let attributeType = "";
  let myValuesArr: string[] = [];
  const productAttributes = dataProductById.product?.attributes;
  const changeAttributeHandler = (event: any) => {
    console.log(event.target.value);
  };
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
            return (
              <div className="img-select">
                <img
                  src={image!}
                  alt={dataProductById.product?.name}
                  key={index}
                  className="img-item"
                  onClick={() => changeMainImage(image!)}
                />
              </div>
            );
          })}
        </div>
        <div className="box">
          <div className="box">
            <img
              src={
                myMainImage
                  ? myMainImage
                  : dataProductById.product?.gallery![0]!
              }
              // className={classes.mainImage}
              width="100%"
              height="100%"
              alt={dataProductById.product?.name}
            />
          </div>
        </div>

        {/* <div className="box">
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
        </div> */}
        <div className="box">
          <div>
            <h2>{dataProductById.product?.brand}</h2>
            <p>{dataProductById.product?.name}</p>
          </div>
        </div>
        <div className="box">
          {/* {productAttributes?.map((item) => {
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
          })} */}

          <div>
            {productAttributes?.map((item) => (
              <div
           
                key={`${productIdFromLocation} ${item?.id}`}
              >
                <p >{`${item?.name}:`}</p>
                <div >
                  {item?.items?.map((attribute, index) => (
                    <div key={`${productIdFromLocation} ${attribute?.id}`}>
                      <input
                        type="radio"
                        style={{ display: "none" }}
                        key={`${item.id} ${attribute?.id}`}
                        id={`${item.id} ${attribute?.id}`}
                        onChange={changeAttributeHandler}
                        value={attribute?.value!}
                        name={item.name!}
                        checked={true}
                        disabled={
                          dataProductById.product?.inStock ? false : true
                        }
                      />
                      <label htmlFor={`${item.id} ${attribute?.id}`}>
                        <div
                          className={
                            item.type !== "swatch"
                              ? 'attributesText'
                              : 'attributesColor'
                          }
                          style={
                            item.type === "swatch"
                              ? {
                                  background: attribute?.value!,
                                  border: `1px solid ${
                                    item.id === "white"
                                      ? "black"
                                      : attribute?.value!
                                  }`,
                                }
                              : undefined
                          }
                        >
                          {item.type !== "swatch" ? attribute?.value : ""}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
                      {`${Math.ceil(price.amount).toFixed(2)}`}
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
          <button className="addToCart">Add to cart</button>
        </div>
        <div
          className="box"
          dangerouslySetInnerHTML={{
            __html: dataProductById.product?.description!,
          }}
        ></div>
      </section>
    </main>
  );
};

export default ProductDetails;
