import * as React from "react";
import { usePdpQuery } from "../../generated/graphql";
import ProductDetails from './PDP';

interface OwnProps {
    id: String;
}
const ProductDetailsContainer: React.FC<OwnProps> = ({id}) => {
  const { data, error, loading, refetch } = usePdpQuery({
    variables: { id: String(id)},   
  });
  React.useEffect(() => {
    refetch({ id: String(id) });
  }, [refetch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR</div>;
  }

  if (!data) {
    return <div>Select a flight from the panel</div>;
  }

  return <ProductDetails data={data} />;
};

export default ProductDetailsContainer;
