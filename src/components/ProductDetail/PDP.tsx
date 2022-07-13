import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectCategory } from "../../slices/categories/categorySlice";
import { selectCurrency } from "../../slices/currency/currencySlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useFetchProductByIdQuery,
  NewProduct,
} from "../../generated/newgenerated/graphql";

import { addItemToCart } from "../../slices/cart/cartSlice";
import sanitizeHtml from "sanitize-html";

import "./styles.css";

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const productIdFromLocation = location.pathname.split("/")[2];
  const dispatch = useAppDispatch();
  const [myMainImage, setMyMainImage] = useState("");
  const [selectedButton, setSelectedButton] = useState<string[]>([""]);
  const myCurrencyState = useAppSelector(selectCurrency);
  const myCategoryState = useAppSelector(selectCategory);

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
      allowedTags: ["b", "i", "br", "em", "li", "h3", "strong", "p", "a"],
      allowedAttributes: {
        a: ["href", "target"],
      },
    });
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
  };
  useEffect(() => {
    refetch({ id: String(productIdFromLocation) });
  }, [refetch, productIdFromLocation]);

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
        const myAttributeCategory = selectedButton.filter(
          (s) => s.split("+")[0] !== splittedAttribute
        );
        setSelectedButton([...myAttributeCategory, event]);
      } else {
        setSelectedButton((prevSelected) => [...prevSelected, event]);
      }
    }
  };

  const productAttributes = dataProductById.product?.attributes;
  const productInStock = dataProductById.product?.inStock;
  //      ***********  MAKING PRODUCT TYPE *******
  const currentPriceState = dataProductById.product?.prices.find(
    (currency) => currency.currency.label === myCurrencyState.activeCurrency
  );
  const myProduct: NewProduct = {
    name: dataProductById.product?.name!,
    image: dataProductById.product?.gallery![0]!,
    brand: dataProductById.product?.brand!,
    gallery: dataProductById.product?.gallery,
    inStock: dataProductById.product?.inStock!,
    id: productIdFromLocation,
    productTotalQuantity: 1,
    category: myCategoryState.activeCategory,
    artificialId: Math.floor(Math.random() * 1000),
    attributes: dataProductById.product?.attributes,
    description: dataProductById.product?.description!,
    prices: dataProductById.product?.prices!,
    currentPrice: currentPriceState!,
    allAttributes: {},
  };
  const myProductPrice = dataProductById.product?.prices?.find(
    (price) => price.currency.label === myCurrencyState.activeCurrency
  );
  return (
    <main>
      <section id="grid" className={`${!productInStock ? "notAvailable" : ""}`}>
        <div id="product-imgs">
          {dataProductById.product?.gallery?.map((image, index) => {
            return (
              <div className="img-select">
                <img
                  src={image!}
                  alt={dataProductById.product?.name}
                  key={index}
                  className={`img-item ${
                    !productInStock ? "notAvailable" : ""
                  } `}
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
              className="main-Img"
              alt={dataProductById.product?.name}
            />
            {!productInStock && (
              <p className="notAvailableText">OUT OF STOCK</p>
            )}
          </div>
        </div>

        <div className="box">
          <div>
            <h2>{dataProductById.product?.brand}</h2>
            <p>{dataProductById.product?.name}</p>
          </div>
        </div>
        <div className="box">
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
                      disabled={!productInStock}
                      className={
                        attribute.type === "swatch"
                          ? `swatchButton ${
                              selectedButton.includes(
                                `${attribute.id}+${finalItem?.id}`
                              )
                                ? "selectedSwatchButton"
                                : ""
                            }`
                          : `attributesButton ${
                              selectedButton.includes(
                                `${attribute.id}+${finalItem?.id}`
                              )
                                ? "selectedAttributeButton"
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

        <div className="box">
          <div className="prices">
            <p>
              <b>PRICE:</b>
            </p>
            <p>
              <b>
                {myProductPrice?.currency.symbol}
                {`${Math.ceil(myProductPrice?.amount!).toFixed(2)}`}
                <br />
              </b>
            </p>
          </div>
        </div>
        <div className="box">
          <button
            className={`${!productInStock ? "disabledButton" : "addToCart"}`}
            onClick={() => dispatch(addItemToCart(myProduct))}
            disabled={!productInStock}
          >
            Add to cart
          </button>
        </div>
        <div className="box">
          <MyComponent />
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;
