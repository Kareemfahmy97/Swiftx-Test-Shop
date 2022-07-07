import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Attribute = {
  __typename?: 'Attribute';
  displayValue?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type AttributeSet = {
  __typename?: 'AttributeSet';
  id: Scalars['String'];
  items?: Maybe<Array<Maybe<Attribute>>>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Category = {
  __typename?: 'Category';
  name?: Maybe<Scalars['String']>;
  products: Array<Maybe<Product>>;
};

export type CategoryInput = {
  title: Scalars['String'];
};

export type Currency = {
  __typename?: 'Currency';
  label: Scalars['String'];
  symbol: Scalars['String'];
};

export type Price = {
  __typename?: 'Price';
  amount: Scalars['Float'];
  currency: Currency;
};

export type Product = {
  __typename?: 'Product';
  attributes?: Maybe<Array<Maybe<AttributeSet>>>;
  brand: Scalars['String'];
  category: Scalars['String'];
  description: Scalars['String'];
  gallery?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  inStock?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  prices: Array<Price>;
};

export type NewProduct = {
  __typename?: "Product";
  attributes?: Maybe<Array<Maybe<AttributeSet>>>;
  brand: Scalars["String"];
  category: Scalars["String"];
  description: Scalars["String"];
  image: string;
  artificialId : number;
  gallery?: Maybe<Array<Maybe<Scalars["String"]>>>;
  id: Scalars["String"];
  inStock?: Maybe<Scalars["Boolean"]>;
  name: Scalars["String"];
  prices: Array<Price>;
  productTotalQuantity: number;
  currentPrice: Price;
  allAttributes: {} | string | null;
};
export type Query = {
  __typename?: 'Query';
  categories?: Maybe<Array<Maybe<Category>>>;
  category?: Maybe<Category>;
  currencies?: Maybe<Array<Maybe<Currency>>>;
  product?: Maybe<Product>;
};


export type QueryCategoryArgs = {
  input?: InputMaybe<CategoryInput>;
};


export type QueryProductArgs = {
  id: Scalars['String'];
};

export type FetchAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllCategoriesQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', name?: string | null } | null> | null };

export type FetchAllCurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllCurrenciesQuery = { __typename?: 'Query', currencies?: Array<{ __typename?: 'Currency', label: string, symbol: string } | null> | null };

export type FetchProductByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type FetchProductByIdQuery = { __typename?: 'Query', product?: { __typename?: 'Product', name: string, description: string, brand: string, inStock?: boolean | null, gallery?: Array<string | null> | null, prices: Array<{ __typename?: 'Price', amount: number, currency: { __typename?: 'Currency', label: string, symbol: string } }>, attributes?: Array<{ __typename?: 'AttributeSet', id: string, name?: string | null, type?: string | null, items?: Array<{ __typename?: 'Attribute', displayValue?: string | null, id: string, value?: string | null } | null> | null } | null> | null } | null };

export type FetchProductsByCategoryQueryVariables = Exact<{
  title: Scalars['String'];
}>;


export type FetchProductsByCategoryQuery = { __typename?: 'Query', category?: { __typename?: 'Category', products: Array<{ __typename?: 'Product', name: string, brand: string, inStock?: boolean | null, description: string, gallery?: Array<string | null> | null, category: string, id: string, attributes?: Array<{ __typename?: 'AttributeSet', id: string, name?: string | null, type?: string | null, items?: Array<{ __typename?: 'Attribute', id: string, value?: string | null } | null> | null } | null> | null, prices: Array<{ __typename?: 'Price', amount: number, currency: { __typename?: 'Currency', label: string, symbol: string } }> } | null> } | null };


export const FetchAllCategoriesDocument = gql`
    query FetchAllCategories {
  categories {
    name
  }
}
    `;

/**
 * __useFetchAllCategoriesQuery__
 *
 * To run a query within a React component, call `useFetchAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FetchAllCategoriesQuery, FetchAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllCategoriesQuery, FetchAllCategoriesQueryVariables>(FetchAllCategoriesDocument, options);
      }
export function useFetchAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllCategoriesQuery, FetchAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllCategoriesQuery, FetchAllCategoriesQueryVariables>(FetchAllCategoriesDocument, options);
        }
export type FetchAllCategoriesQueryHookResult = ReturnType<typeof useFetchAllCategoriesQuery>;
export type FetchAllCategoriesLazyQueryHookResult = ReturnType<typeof useFetchAllCategoriesLazyQuery>;
export type FetchAllCategoriesQueryResult = Apollo.QueryResult<FetchAllCategoriesQuery, FetchAllCategoriesQueryVariables>;
export const FetchAllCurrenciesDocument = gql`
    query FetchAllCurrencies {
  currencies {
    label
    symbol
  }
}
    `;

/**
 * __useFetchAllCurrenciesQuery__
 *
 * To run a query within a React component, call `useFetchAllCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchAllCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchAllCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchAllCurrenciesQuery(baseOptions?: Apollo.QueryHookOptions<FetchAllCurrenciesQuery, FetchAllCurrenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchAllCurrenciesQuery, FetchAllCurrenciesQueryVariables>(FetchAllCurrenciesDocument, options);
      }
export function useFetchAllCurrenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchAllCurrenciesQuery, FetchAllCurrenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchAllCurrenciesQuery, FetchAllCurrenciesQueryVariables>(FetchAllCurrenciesDocument, options);
        }
export type FetchAllCurrenciesQueryHookResult = ReturnType<typeof useFetchAllCurrenciesQuery>;
export type FetchAllCurrenciesLazyQueryHookResult = ReturnType<typeof useFetchAllCurrenciesLazyQuery>;
export type FetchAllCurrenciesQueryResult = Apollo.QueryResult<FetchAllCurrenciesQuery, FetchAllCurrenciesQueryVariables>;
export const FetchProductByIdDocument = gql`
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

/**
 * __useFetchProductByIdQuery__
 *
 * To run a query within a React component, call `useFetchProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProductByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFetchProductByIdQuery(baseOptions: Apollo.QueryHookOptions<FetchProductByIdQuery, FetchProductByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchProductByIdQuery, FetchProductByIdQueryVariables>(FetchProductByIdDocument, options);
      }
export function useFetchProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchProductByIdQuery, FetchProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchProductByIdQuery, FetchProductByIdQueryVariables>(FetchProductByIdDocument, options);
        }
export type FetchProductByIdQueryHookResult = ReturnType<typeof useFetchProductByIdQuery>;
export type FetchProductByIdLazyQueryHookResult = ReturnType<typeof useFetchProductByIdLazyQuery>;
export type FetchProductByIdQueryResult = Apollo.QueryResult<FetchProductByIdQuery, FetchProductByIdQueryVariables>;
export const FetchProductsByCategoryDocument = gql`
    query FetchProductsByCategory($title: String!) {
  category(input: {title: $title}) {
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

/**
 * __useFetchProductsByCategoryQuery__
 *
 * To run a query within a React component, call `useFetchProductsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchProductsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchProductsByCategoryQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useFetchProductsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<FetchProductsByCategoryQuery, FetchProductsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchProductsByCategoryQuery, FetchProductsByCategoryQueryVariables>(FetchProductsByCategoryDocument, options);
      }
export function useFetchProductsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchProductsByCategoryQuery, FetchProductsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchProductsByCategoryQuery, FetchProductsByCategoryQueryVariables>(FetchProductsByCategoryDocument, options);
        }
export type FetchProductsByCategoryQueryHookResult = ReturnType<typeof useFetchProductsByCategoryQuery>;
export type FetchProductsByCategoryLazyQueryHookResult = ReturnType<typeof useFetchProductsByCategoryLazyQuery>;
export type FetchProductsByCategoryQueryResult = Apollo.QueryResult<FetchProductsByCategoryQuery, FetchProductsByCategoryQueryVariables>;