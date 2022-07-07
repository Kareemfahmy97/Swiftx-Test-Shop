import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  
  NewProduct,
  Product,
} from "../../generated/newgenerated/graphql";
import { RootState } from "../../app/store";

export interface CartState {
  cartTotalQuantity: number;
  cartProducts: NewProduct[];
  status: string;
  cartTotalAmount: number;
  product: Product[];
}

const initialState: CartState = {
  status: "",
  cartProducts: localStorage.getItem("cartProducts") ? JSON.parse(localStorage.getItem("cartProducts")!) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  product: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<NewProduct>) => {

      const itemIndex = state.cartProducts.findIndex(
        (item) => item.id === action.payload.id
        );
      if (itemIndex < 0) {
        state.cartProducts.push(action.payload);
      } else {
        state.cartProducts[itemIndex].productTotalQuantity += 1;
      }
      state.cartTotalQuantity += 1;

      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
    },
    quantityIncrement: (state, action) => {
      const newCart = JSON.parse(JSON.stringify(state.cartProducts));
      const currentProduct = newCart.findIndex(
        (item: NewProduct) => item.id === action.payload
      );
      state.cartProducts[currentProduct].productTotalQuantity += 1;
      state.cartTotalQuantity += 1;

      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));

    },
    quantityDecrement: (state, action) => {
       const newCart = JSON.parse(JSON.stringify(state.cartProducts));

       const currentProduct = newCart.findIndex(
         (item: NewProduct) => item.id === action.payload
       );
       const currentQuantity = state.cartProducts[currentProduct].productTotalQuantity;
       if(currentQuantity > 1){
         state.cartProducts[currentProduct].productTotalQuantity -= 1;

      }else if(currentQuantity === 1){
        const newCartProducts = state.cartProducts.filter(
          item => item.id !== action.payload
        );
        state.cartProducts = newCartProducts
      }
      state.cartTotalQuantity -= 1;
      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));


    },
    modifyCartItemQuantity: (state, action) => {
      let {total, quantity}=state.cartProducts.reduce((cartTotal, cartProduct)=>{
        const {currentPrice ,productTotalQuantity} = cartProduct;
        
        const itemTotal = currentPrice.amount * productTotalQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += productTotalQuantity;

        return cartTotal;
      },
      {
        total:0,
        quantity: 0,
      }
      );
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity;
    },
  },
});

export const selectCartState = (state: RootState) => state.shopCart;

export const { addItemToCart, quantityIncrement, quantityDecrement,modifyCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
