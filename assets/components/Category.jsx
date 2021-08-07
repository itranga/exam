import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartDispatchContext, addToCart } from "../contexts/cart";

const CategoryCard = ({ data }) => {
  const { name, id } = data;

  return (
    <div className="category">
      <h4 className="category-name">
        <Link to={`/product/${id}`}>{name}</Link>
      </h4>
    </div>
  );
};

export default CategoryCard;
