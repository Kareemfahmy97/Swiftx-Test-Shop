import { gql, useQuery } from "@apollo/client";

export const PRODUCTS = gql`

  query categories {
    category {
      name
      products {
        id
        name
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        inStock
        gallery
        category
        description
        attributes {
          id
          name
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

function MyProducts(){
  const { loading, error, data } = useQuery(PRODUCTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div name="product">
      {data.category.map((item) => (
        <option key={item.products.id} value={item.name}>
          {item.products.id}
          {item.products.name}
          {item.products.prices.currency}
        </option>
      ))}
    </div>
  );
}
export default MyProducts;