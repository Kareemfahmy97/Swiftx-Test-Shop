import { Price, } from "../generated/newgenerated/graphql";
import { Attribute } from "../generated/newgenerated/graphql";
import { AttributeSet } from "../generated/graphql";


export {};

declare global {

  interface ProductWithQuantity {
            name: string, 
            Image: string,
            brand: string,
            inStock: boolean,
            id: string,
            productQuantity: number,
            category:string,
            artificialId: number,
            attributes: AttributeSet,
            description: string,
            prices: Price,
            allAttributes: Attribute,
  }

  type Person = {
    name: string;
    age: number;
  };
}
