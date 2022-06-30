import { gql } from "@apollo/client";


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
