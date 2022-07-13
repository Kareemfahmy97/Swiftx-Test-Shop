import { Link } from "react-router-dom";
import classes from "./SingleProduct.module.css";
import React, {  useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCategory } from "../../features/categories/categorySlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { useFetchAllCategoriesQuery, Price ,useFetchAllCurrenciesQuery, NewProduct} from "../../generated/newgenerated/graphql";
import { setActiveProductId} from '../../features/products/productSlice';

import addtocart from '../Assests/addtocart.png';
import { addItemToCart, selectCartState } from "../../features/cart/cartSlice";

interface Props {
  productData: NewProduct;
  price: Price;
}


export const SingleProduct: React.FC<Props> = ({productData, price}) => {
    const [isFocus , setIsFocus] = useState(false);
    const myCategoriesState = useAppSelector(selectCategory);
    const myCurrenciesState = useAppSelector(selectCurrency);
    const myCartState = useAppSelector(selectCartState);
    const myCurrency = myCurrenciesState.activeCurrency;
    const dispatch = useAppDispatch();
    const {data: currencyData , error: currencyError, loading: currencyLoading } = useFetchAllCurrenciesQuery({});
    const { data: categoriesData, error: categoriesError, loading: categoriesLoading } = useFetchAllCategoriesQuery({});
   
      if (categoriesLoading || currencyLoading) {
      return <div>Loading Categories and Currency...</div>;
    }

    if (categoriesError || !categoriesData ) {
      return <div>ERROR CATEGORIES</div>;
    }
    if(currencyError || !currencyData){
        return <div>ERROR CURRENCY</div>
    }

    const productInStock = productData.inStock;

    
    return (
      <div
        className={`${classes.container} ${
          !productInStock ? classes.notAvailable : ""
        }`}
        onMouseEnter={() => setIsFocus(true)}
        onMouseLeave={() => setIsFocus(false)}
      >
        {productInStock && isFocus && (
          <img
            src={addtocart}
            className={classes.addtocart}
            alt="addtocart"
            onClick={() => dispatch(addItemToCart(productData))}
          />
        )}
        <Link to={`/product/${productData.id}`} key={productData.id}>
          <div
            className={`${classes.containerImg}`}
          >
            <img
              src={productData.image}
              key={productData.id}
              alt={productData?.name}
              className={classes.productImg}
            />
            {!productInStock && (
              <p className={classes.notAvailableText}>OUT OF STOCK</p>
            )}
          </div>
        </Link>
        <div className={classes.containerDetails}>
          {/* Product name and price */}

          <p>{productData?.name}</p>
          <p
            className={classes.productPrice}
          >{`${price.currency.symbol}${price.amount}`}</p>

          {/* <ProductAttributes data={productData} /> */}
        </div>
      </div>
    );
  }




export default SingleProduct;
