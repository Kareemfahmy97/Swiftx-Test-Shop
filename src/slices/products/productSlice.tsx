import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PdpQuery } from "../../generated/graphql";
import { RootState } from "../../store";

export interface ProductState {
  currentProductId: string;
  productData: PdpQuery[];
  loading: string;
}

export const ProductSlice = createSlice({
  name: "currencies",
  initialState: {
    currentProductId: "",
    productData: [],
    loading: "",
  },
  reducers: {
    setActiveProductId: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentProductId: action.payload,
      };
    },
    setProductData: (state, action) => {
      return {
        ...state,
        productData: action.payload,
      };
    },
  },
});

export const selectProduct = (state: RootState) => state.shopProduct;

export const { setActiveProductId, setProductData } = ProductSlice.actions;
export default ProductSlice.reducer;
