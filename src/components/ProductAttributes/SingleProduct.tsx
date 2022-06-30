import { Link } from "react-router-dom";
import classes from "./SingleProduct.module.css";
import React, {  useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCategory } from "../../features/categories/categorySlice";
import { selectCurrency } from "../../features/currency/currencySlice";
import { useFetchAllCategoriesQuery, Price ,useFetchAllCurrenciesQuery, Product} from "../../generated/newgenerated/graphql";
import { setActiveProductId} from '../../features/products/productSlice';

import addtocart from '../Assests/addtocart.png';
import { addItemToCart, selectCartState } from "../../features/cart/cartSlice";

interface Props {
  productData: Product;
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
    const createProductObeject = () => {
      const myProduct = {
        name: productData.name,
        Image: productData.gallery![0],
        brand: productData.brand,
        id: productData.id,
        quantity: 1,
        category: productData.category,
        productId: Math.floor(Math.random()*1000),
        attributes: {},
        prices: price,
        allAttributes: productData.attributes,
      }

    }

    
    return (
      <div
        className={classes.container}
        onMouseEnter={() => setIsFocus(true)}
        onMouseLeave={()=> setIsFocus(false)}
      > 
      <Link to={`/product/${productData.id}`}>
        <img
          src={productData?.gallery![0]!}
          height="300"
          width="auto"
          alt={productData?.name}
          className={classes.productImg}
          onClick={() => dispatch(setActiveProductId(productData?.id))}
        />
      </Link>
        <div className={classes.details}>
          {/* Product name and price */}
          <h4>{productData?.name}</h4>
          {isFocus && (
            <img
              src={addtocart}
              className={classes.addtocart}
              alt="addtocart"
              onClick={() =>  dispatch(addItemToCart(productData))}
            />
          )}
          <h5>{`${price.currency.symbol}${price.amount}`}</h5>

          <hr />

          {/* <ProductAttributes data={productData} /> */}
        </div>
      </div>
    );
  }




export default SingleProduct;
