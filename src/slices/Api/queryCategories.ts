import { gql } from "@apollo/client";

export const QUERY_ALL_CATEGORIES = gql`
  query FetchAllCategories {
    categories {
      name
    }
  }
`;

export const QUERY_ALL_CURRENCIES = gql`
  query FetchAllCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

export const QUERY_PRODUCT_BY_ID = gql`
  query FetchProductByID($id: String!) {
    product(id: $id) {
      name
      description
      brand
      inStock
      gallery
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          id
          value
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS_BY_CATEGORY = gql`
  query FetchProductsByCategory($title: String!) {
    category(input: { title: $title }) {
      products {
        name
        brand
        inStock
        description
        gallery
        category
        id
        attributes {
          id
          name
          type
          items {
            id
            value
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;
