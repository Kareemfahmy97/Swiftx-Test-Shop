import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categorySlice from './slices/categories/categorySlice';
import currencySlice from './slices/currency/currencySlice';
import productSlice from './slices/products/productSlice';
import cartReducer from './slices/cart/cartSlice';

export const store = configureStore({
  reducer: {
    shopCategories: categorySlice,
    shopCurrency: currencySlice,
    shopProduct: productSlice,
    shopCart: cartReducer,
  },
  // middleware: (getDefaultMiddleware)  => getDefaultMiddleware().concat()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
