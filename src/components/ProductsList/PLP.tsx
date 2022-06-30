import * as React from "react";
import { ProductListQuery } from "../../generated/graphql";
import "./styles.css";


export interface OwnProps {
  handleIdChange: (newId: number) => void;
}

interface Props extends OwnProps {
  data: ProductListQuery;
}

const className = "ProductList";

const LaunchList: React.FC<Props> = ({ data, handleIdChange }) => (
  <div className={className}>
    <h3>Launches</h3>
    <ol className={`${className}__list`}>
      {!!data.categories &&
        data.categories.map(
          (launch, i) =>
            !!launch && (
              <li
                key={i}
                className={`${className}__item`}
                onClick={() => handleIdChange(52)}
              >
                {launch.name}
              </li>
            )
        )}
    </ol>
  </div>
);

export default LaunchList;
