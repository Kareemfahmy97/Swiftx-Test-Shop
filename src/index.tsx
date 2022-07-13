import React from "react";
import {createRoot} from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./index.css";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

const container = document.getElementById('root')!;
const root = createRoot(container);

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);



