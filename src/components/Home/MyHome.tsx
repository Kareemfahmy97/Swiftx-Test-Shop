import React from "react";

import { useAppSelector } from "../../hooks";
import { selectCurrency } from "../../slices/currency/currencySlice";
import {
  NewProduct,
  useFetchProductsByCategoryQuery,
} from "../../generated/newgenerated/graphql";

import classes from "./MyHome.module.css";
import SingleProduct from "../SingleProduct/SingleProduct";
import { useLocation } from "react-router-dom";

const MyHome: React.FC = () => {
  const myCurrenciesState = useAppSelector(selectCurrency);
  const location = useLocation();
  const currentCategoryFromLocation = location.pathname.split("/")[1];

  //     ******* FETCH DATA BY CATEGORY NAME *******
  const {
    data: productsByCategory,
    error: errorProductsByCategory,
    loading: loadingProductsByCategory,
  } = useFetchProductsByCategoryQuery({
    variables: {
      title: String(currentCategoryFromLocation),
    },
  });
  const getCurrentProducts = () => {
    if (errorProductsByCategory || !productsByCategory) {
      // return <div>NO DATA FETCHED!</div>;
      return null;
    }
    if (loadingProductsByCategory) {
      // return <h2>Please Wait LOADING ALL DATA... </h2>;
      return null;

    }
    if (productsByCategory) {
      //    **********   MAP PRODUCTS TO GET EACH PRODUCT - DATA - PRICE  ********

      return productsByCategory.category?.products.map((product) => {
        const currentPriceState = product?.prices.find(
          (currency) =>
            currency.currency.label === myCurrenciesState.activeCurrency
        );
        //      ***********  PASSING DATA TO EVERY PRODUCT *******

        const myProduct: NewProduct = {
          name: product?.name!,
          image: product?.gallery![0]!,
          brand: product?.brand!,
          gallery: product?.gallery!,
          inStock: product?.inStock!,
          id: product?.id!,
          productTotalQuantity: 1,
          category: product?.category!,
          artificialId: Math.floor(Math.random() * 1000),
          attributes: product?.attributes,
          description: product?.description!,
          prices: product?.prices!,
          currentPrice: currentPriceState!,
          allAttributes: {},
        };

        return (
          <SingleProduct
            productData={myProduct!}
            price={currentPriceState!}
            key={product?.id!}
          />
        );
      });
    }
  };

  return (
    <div className={classes.container}>
      <p style={{ fontSize: "28px", fontWeight: "700" }}>
        {currentCategoryFromLocation.toUpperCase()}
      </p>

      <div className={classes.productsList}>{getCurrentProducts()}</div>
    </div>
  );
};

export default MyHome;
