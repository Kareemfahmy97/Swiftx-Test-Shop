import { gql } from "@apollo/client";

export const QUERY_PRODUCT_DETAILS = gql`
  query PDP($id: String!) {
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


