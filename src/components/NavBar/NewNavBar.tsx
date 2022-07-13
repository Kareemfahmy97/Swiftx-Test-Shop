import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectCategory } from "../../slices/categories/categorySlice";
import {
  selectCurrency,
  setActiveCurrency,
  setActiveSymbol,
} from "../../slices/currency/currencySlice";
import {
  useFetchAllCategoriesQuery,
  useFetchAllCurrenciesQuery,
} from "../../generated/newgenerated/graphql";
import { updateActiveCategory } from "../../slices/categories/categorySlice";
import classes from "./MyNavBar.module.css";
import Cart from "../Assests/Cart.png";
import {
  selectCartState,
  modifyCartItemQuantity,
} from "../../slices/cart/cartSlice";
import MiniCart from "../Cart/MiniCart";
import { Link } from "react-router-dom";
// import { setActiveProductId } from "../../slices/products/productSlice";
import ShopLogo from "../Assests/VSF.png";
const NewNavbar: React.FC = () => {
  const myCategoriesState = useAppSelector(selectCategory);
  const myCurrenciesState = useAppSelector(selectCurrency);
  const myCartState = useAppSelector(selectCartState);
  // const [currencyOpened, setCurrencyOpened] = useState(false);
  const [isCartOpened, setIsCartOpened] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(modifyCartItemQuantity(myCurrenciesState.activeCurrency));
  }, [dispatch, myCartState, myCurrenciesState.activeCurrency]);

  // const handleCurrencySwitcher = () => {
  //   setCurrencyOpened((prevState) => !prevState);
  // };
  const showMiniCart = () => {
    setIsCartOpened((prevState) => !prevState);
  };
  // const location = useLocation();
  // const productIdFromLocation = location.pathname.split("/")[2];

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
    const myCurrency = currencyData.currencies?.find(
      (c) => c?.label === e.target.value
    );
    dispatch(setActiveSymbol(myCurrency?.symbol!));
  };
  const myCartProducts = myCartState.cartProducts;

  return (
    <nav className={classes.navbar}>
      <div className={classes.categories}>
        {!!categoriesData.categories &&
          categoriesData.categories.map(
            (category, i) =>
              !!category && (
                <Link
                  to={`/${category.name}`}
                  key={i}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onClick={() => {
                    dispatch(updateActiveCategory(category.name!));
                    if (isCartOpened) {
                      showMiniCart();
                    }
                  }}
                >
                  <div
                    className={`${classes.CategoryItem} ${
                      myCategoriesState.activeCategory === category.name
                        ? classes.CategoryItemActive
                        : ""
                    }`}
                  >
                    {category.name?.toUpperCase()}
                  </div>
                </Link>
              )
          )}
      </div>
      <div>
        <Link to={"/all"}>
          <img
            src={ShopLogo}
            alt="Website Logo"
            style={{
              width: "28px",
              height: "26px",
              position: "absolute",
              left: "49%",
              top: "30%",
            }}
          />
        </Link>
      </div>

      <div className={classes.misc}>
        <select className={classes.currency} onChange={handleCurrency}>
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
          {myCartState.cartTotalQuantity === 0 ? (
            ""
          ) : (
            <span className={classes.badge}>
              {myCartState.cartTotalQuantity}
            </span>
          )}
        </button>
      </div>
      {isCartOpened && (
        <>
          <div
            className={classes.backdrop}
            onClick={() => showMiniCart()}
          ></div>
          <MiniCart
            myCartProducts={myCartProducts}
            cartOpened={setIsCartOpened}
          />
        </>
      )}
    </nav>
  );
};

export default NewNavbar;
