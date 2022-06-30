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

export type PdpQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PdpQuery = { __typename?: 'Query', product?: { __typename?: 'Product', name: string, description: string, brand: string, inStock?: boolean | null, gallery?: Array<string | null> | null, prices: Array<{ __typename?: 'Price', amount: number, currency: { __typename?: 'Currency', label: string, symbol: string } }>, attributes?: Array<{ __typename?: 'AttributeSet', id: string, name?: string | null, type?: string | null, items?: Array<{ __typename?: 'Attribute', displayValue?: string | null, id: string, value?: string | null } | null> | null } | null> | null } | null };

export type ProductListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductListQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', name?: string | null, products: Array<{ __typename?: 'Product', id: string, name: string, brand: string, inStock?: boolean | null, gallery?: Array<string | null> | null, prices: Array<{ __typename?: 'Price', amount: number, currency: { __typename?: 'Currency', symbol: string, label: string } }>, attributes?: Array<{ __typename?: 'AttributeSet', type?: string | null, name?: string | null, items?: Array<{ __typename?: 'Attribute', value?: string | null, displayValue?: string | null, id: string } | null> | null } | null> | null } | null> } | null> | null };


export const PdpDocument = gql`
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

/**
 * __usePdpQuery__
 *
 * To run a query within a React component, call `usePdpQuery` and pass it any options that fit your needs.
 * When your component renders, `usePdpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePdpQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePdpQuery(baseOptions: Apollo.QueryHookOptions<PdpQuery, PdpQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PdpQuery, PdpQueryVariables>(PdpDocument, options);
      }
export function usePdpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PdpQuery, PdpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PdpQuery, PdpQueryVariables>(PdpDocument, options);
        }
export type PdpQueryHookResult = ReturnType<typeof usePdpQuery>;
export type PdpLazyQueryHookResult = ReturnType<typeof usePdpLazyQuery>;
export type PdpQueryResult = Apollo.QueryResult<PdpQuery, PdpQueryVariables>;
export const ProductListDocument = gql`
    query ProductList {
  categories {
    name
    products {
      id
      name
      brand
      inStock
      gallery
      prices {
        amount
        currency {
          symbol
          label
        }
      }
      attributes {
        type
        name
        items {
          value
          displayValue
          id
        }
      }
    }
  }
}
    `;

/**
 * __useProductListQuery__
 *
 * To run a query within a React component, call `useProductListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductListQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductListQuery(baseOptions?: Apollo.QueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
      }
export function useProductListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductListQuery, ProductListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductListQuery, ProductListQueryVariables>(ProductListDocument, options);
        }
export type ProductListQueryHookResult = ReturnType<typeof useProductListQuery>;
export type ProductListLazyQueryHookResult = ReturnType<typeof useProductListLazyQuery>;
export type ProductListQueryResult = Apollo.QueryResult<ProductListQuery, ProductListQueryVariables>;