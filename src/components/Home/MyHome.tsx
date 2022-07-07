
import React, { useEffect} from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCategory } from "../../features/categories/categorySlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { NewProduct, useFetchAllCategoriesQuery, useFetchAllCurrenciesQuery, useFetchProductsByCategoryQuery } from "../../generated/newgenerated/graphql";
import {
  selectCartState,
  modifyCartItemQuantity,
} from "../../features/cart/cartSlice";
import classes from './MyHome.module.css';
import SingleProduct from "../ProductAttributes/SingleProduct";


const MyHome: React.FC = () => {

 const myCategoriesState = useAppSelector(selectCategory);
    const myCurrenciesState = useAppSelector(selectCurrency);
      const myCartState = useAppSelector(selectCartState);
  const dispatch = useAppDispatch();
    const {data: currencyData , error: currencyError, loading: currencyLoading } = useFetchAllCurrenciesQuery({});
    const { data: categoriesData, error: categoriesError, loading: categoriesLoading } = useFetchAllCategoriesQuery({});


    // const myCartStateChanged = useCallback(()=>{
    //  dispatch(modifyCartItemQuantity(null));

    // }, [dispatch])


  //     ******* FETCH DATA BY CATEGORY NAME *******
      const {
  data: productsByCategory,
  error: errorProductsByCategory,
  loading: loadingProductsByCategory,
} = useFetchProductsByCategoryQuery({
  variables: {
    title: String(myCategoriesState.activeCategory),
  },
});
  const getCurrentProducts= () => {
    if (categoriesLoading || currencyLoading) {
      return <div>Loading Categories and Currency...</div>;
    }

    if (categoriesError || !categoriesData ) {
      return <div>ERROR CATEGORIES</div>;
    }
    if(currencyError || !currencyData){
        return <div>ERROR CURRENCY</div>
    }
    if(errorProductsByCategory || !productsByCategory){
      return <div>NO DATA FETCHED!</div>
    }
    if(loadingProductsByCategory){
      return <h2>Please Wait LOADING ALL DATA... </h2>
    }
    if(productsByCategory){
      //    **********   MAP PRODUCTS TO GET EACH PRODUCT - DATA - PRICE  ********
            
      return(
        productsByCategory.category?.products.map(product => {
          
          const currentPriceState = product?.prices.find(currency => currency.currency.label === myCurrenciesState.activeCurrency);
          //      ***********  PASSING DATA TO EVERY PRODUCT *******
            
          const myProduct: NewProduct = {
            name: product?.name!,
            image: product?.gallery![0]!,
            brand: product?.brand!,
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
          
          return <SingleProduct productData={myProduct!} price={currentPriceState!} key={product?.id!}/>
        })
        )
    }
    
    } 


    return (
      <div className={classes.container}>
        {!! productsByCategory && (
          <>
            <h1>{myCategoriesState.activeCategory.toUpperCase()}</h1>

            <div className={classes.productsList}>{getCurrentProducts()}</div>
          </>
        )}
      </div>
    );
  
}

export default MyHome;
