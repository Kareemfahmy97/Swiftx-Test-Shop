import { gql } from "@apollo/client";

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
