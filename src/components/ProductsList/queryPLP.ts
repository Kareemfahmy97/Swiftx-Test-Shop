import { gql } from "@apollo/client";

export const QUERY_LAUNCH_LIST = gql`
  query ProductList {
    categories{
    name
    products{
      id
      name
      brand
      inStock
      gallery
      prices{
        amount
        currency{
          symbol
          label
        }
      }
      attributes{
        type
        name
        items{
          value
          displayValue
          id
        }
      }
    }
  }
  }
`;
