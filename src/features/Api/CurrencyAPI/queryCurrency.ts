import { gql } from "@apollo/client";

export const QUERY_ALL_CURRENCIES = gql`
  query FetchAllCurrencies {
    currencies {
      label
      symbol
    }
  }
`;