import React, { Component, useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCategory } from "../../features/categories/categorySlice";
import {
  selectCurrency,
  setActiveCurrency,
} from "../../features/currency/currencySlice";
import {
  useFetchAllCategoriesQuery,
  useFetchAllCurrenciesQuery,
} from "../../generated/newgenerated/graphql";
import { useProductListQuery } from "../../generated/graphql";
import { updateActiveCategory } from "../../features/categories/categorySlice";
import classes from "./MyNavBar.module.css";
import Currency from '../Assests/Currency.png';
import Cart from '../Assests/Cart.png';
import cartSlice, { selectCartState } from "../../features/cart/cartSlice";
import MiniCart from "../Cart/MiniCart";

const NewNavbar: React.FC = () => {


 
  const myCategoriesState = useAppSelector(selectCategory);
  const myCurrenciesState = useAppSelector(selectCurrency);
  const myCartState = useAppSelector(selectCartState);
  const [currencyOpened, setCurrencyOpened] = useState(false);
  const [isCartOpened, setIsCartOpened] = useState(false);

  const handleCurrencySwitcher =() => {
    setCurrencyOpened(prevState => !prevState);
  }
  const showMiniCart = () => {
    setIsCartOpened(prevState => !prevState);
  }

  

  const dispatch = useAppDispatch();
  const {
    data: currencyData,
    error: currencyError,
    loading: currencyLoading,
  } = useFetchAllCurrenciesQuery({});
  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
  } = useFetchAllCategoriesQuery({});


  if (categoriesLoading || currencyLoading) {
    return <div>Loading Categories and Currency...</div>;
  }

  if (categoriesError || !categoriesData) {
    return <div>ERROR CATEGORIES</div>;
  }
  if (currencyError || !currencyData) {
    return <div>ERROR CURRENCY</div>;
  }
  


  const handleCurrency = (e: any) => {
    dispatch(setActiveCurrency(e.target.value));
  };

  return (
    <nav className={classes.navbar}>
     
      <div className={classes.categories}>
        {!!categoriesData.categories &&
          categoriesData.categories.map(
            (category, i) =>
              !!category && (
                <span
                  key={i}
                  className={classes.category}
                  onClick={() => dispatch(updateActiveCategory(category.name!))}
                >
                  {category.name?.toUpperCase()}
                </span>
              )
          )}
      </div>


      <div className={classes.misc}>
        <select
          className={classes.currency}
          //   value={myCurrenciesState.activeCurrency}
          onChange={handleCurrency}
        >
          {!!currencyData?.currencies &&
            currencyData.currencies.map(
              (currency, i) =>
                !!currency && (
                  <option
                    key={i}
                    className={classes.currencyOption}
                    value={currency.label}
                  >
                    {currency.symbol} {currency.label}
                  </option>
                )
            )}
        </select>

        <button
          aria-label="show shopping bag button"
          onClick={() => showMiniCart()}
        >
          <img src={Cart} alt="shopping bag icon" />
          {myCartState.totalQuantity === 0 ? '' : 
          <span className={classes.badge}>
            {myCartState.totalQuantity}
          </span>
          
          }
        </button>
      </div>
      {isCartOpened && <MiniCart />}

    </nav>
  );
};

export default NewNavbar;
