import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ProductListQuery } from "../../generated/graphql";

export interface CategoryState {
  categories: string[];
  data: ProductListQuery[];
  activeCategory: string;
  status: string;
  value: number;
}

const initialState: CategoryState = {
  categories: [],
  data: [],
  activeCategory: "all",
  status: "",
  value: 0,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchAllCategories: (state, action: PayloadAction<string>) => {},
    updateActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
  },
});
export const selectCategory = (state: RootState) => state.shopCategories;
export const { updateActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;
