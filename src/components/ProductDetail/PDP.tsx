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
  import sanitizeHtml from "sanitize-html";

import "./styles.css";

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const productIdFromLocation = location.pathname.split("/")[2];
  console.log(productIdFromLocation);
  const dispatch = useAppDispatch();
  const [myMainImage, setMyMainImage] = useState("");
  const [selectedButton, setSelectedButton] = useState<string[]>(['']);
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
  
  const MyComponent = () => {
    const dirty = dataProductById?.product?.description;
    const clean = sanitizeHtml(dirty!, {
      allowedTags: ["b", "i", "br" ,"em","li",'h3', "strong", 'p', "a"],
      allowedAttributes: {
        a: ["href", "target"],
      },
    });
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
  };
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
        console.log(myRepeatedCategory);
        setSelectedButton([...myRepeatedCategory, event]);
      } else {
        setSelectedButton((prevSelected) => [...prevSelected, event]);
      }
    }
  };

  // let attributeName = "";
  // let attributeType = "";
  // let myValuesArr: string[] = [];
  const productAttributes = dataProductById.product?.attributes;
  // const changeAttributeHandler = (event: any) => {
  //   console.log(event.target.value);
  // };
  // const filtering = productAttributes?.map((item) => {
  //   return (
  //     (attributeName = item?.name!),
  //     (attributeType = item?.type!),
  //     item?.items?.map((myitem, i) => myValuesArr.push(myitem?.displayValue!))
  //   );
  // });

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
          {/* <div> */}
            {productAttributes?.map((attribute) => {
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
                            ? `swatchButton ${
                                selectedButton.includes(
                                  `${attribute.id}+${finalItem?.id}`
                                )
                                  ? 'selectedSwatchButton'
                                  : ""
                              }`
                            : `attributesButton ${
                                selectedButton.includes(
                                  `${attribute.id}+${finalItem?.id}`
                                )
                                  ? 'selectedAttributeButton'
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
                </div>);
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
                  <p>
                    <b>
                      {price.currency.symbol}
                      {`${Math.ceil(price.amount).toFixed(2)}`}
                      <br />
                    </b>

                    <label key={price.amount}></label>
                  </p>
                </div>
              );
            }
          })}
        </div>
        <div className="box">
          <button className="addToCart">Add to cart</button>
        </div>
        <div className="box">
        <MyComponent />
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
