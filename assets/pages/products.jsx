import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/Product";
import {
  ProductsStateContext,
  ProductsDispatchContext,
  getProducts,
} from "../contexts/products";

const Products = () => {
  const { products, isLoading, isLoaded } = useContext(ProductsStateContext);
  const dispatch = useContext(ProductsDispatchContext);

  let { cateId } = useParams();

  const productsList = products;
  useEffect(() => {
    getProducts(dispatch, cateId);
  }, []);

  if (isLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="products-wrapper">
      <div className="products">
        {isLoaded &&
          productsList.map((data) => {
            return <ProductCard key={data.id} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Products;
