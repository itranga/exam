import React, { useEffect, useContext } from "react";
import CategoryCard from "../components/Category";
import {
  ProductsStateContext,
  ProductsDispatchContext,
  getProducts,
} from "../contexts/products";

import {
  CategoryStateContext,
  CategoryDispatchContext,
  getCategories,
} from "../contexts/categories";

const Home = () => {
  const { categories, isLoadingCate, isLoadedCate } =
    useContext(CategoryStateContext);
  const cateDispatch = useContext(CategoryDispatchContext);

  useEffect(() => {
    getCategories(cateDispatch);
  }, []);

  if (isLoadingCate) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="products-wrapper">
      <div className="products">
        {isLoadedCate &&
          categories.map((data) => {
            return <CategoryCard key={data.id} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Home;
