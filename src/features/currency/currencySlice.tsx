import React from 'react';
import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchAllCurrenciesQuery } from "../../generated/newgenerated/graphql";

import { RootState } from '../../app/store';


export interface CurrencyState {
  categories: string[];
  data: FetchAllCurrenciesQuery[];
  activeCurrency: string;
  activeSymbol: string;
  status: string;
  value: number;
}

export const CurrencySlice = createSlice({
  name: "currencies",
  initialState: {
    currencies: [],
    activeCurrency: "USD",
    activeSymbol: "$",
    loading: "",
  },
  reducers: {
    setActiveCurrency: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        activeCurrency: action.payload,
      };
    },
    setActiveSymbol: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        activeSymbol: action.payload,
      };
    },
  },
});
export const selectCurrency = (state: RootState) => state.shopCurrency;

export const { setActiveCurrency, setActiveSymbol } = CurrencySlice.actions;
export default CurrencySlice.reducer;
