import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { FetchProductByIdQuery, Product } from "../../generated/newgenerated/graphql";
import { selectCurrency } from "../currency/currencySlice";
import { RootState } from "../../app/store";

export interface CartState {
  totalQuantity: number;
  products: Product[];
  status: string;
  clicked: false;
  cartMenuOpen: boolean;
  amount: number;
  product: Product[];
}

const initialState: CartState = {
  status: "",
  products: [],
  totalQuantity: 0,
  amount: 0,
  clicked: false,
  cartMenuOpen: false,
  product: [],
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action ) => {
        state.totalQuantity += 1;
        state.products.push(action.payload);
                
    },
    quantityIncrement: (state, action ) => {
        state.totalQuantity += action.payload;
    
    },
    quantityDecrement: (state, action)=>{
        state.totalQuantity -= action.payload;
        
    },
    modifyCartItemQuantity: (state, action)=>{
        const modifyMe = state.products.find(
          (item) => item.id === action.payload.id);
        
    }
}});

export const selectCartState = (state: RootState) => state.shopCart;

export const {
  addItemToCart,
  quantityIncrement,
  quantityDecrement
} = cartSlice.actions;
export default cartSlice.reducer;
