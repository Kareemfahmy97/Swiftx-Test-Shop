import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categorySlice from '../features/categories/categorySlice';
import currencySlice from '../features/currency/currencySlice';
import productSlice from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    shopCategories: categorySlice,
    shopCurrency: currencySlice,
    shopProduct: productSlice,
    shopCart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
