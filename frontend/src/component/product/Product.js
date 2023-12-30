import React from "react";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

function Product({ product }) {
  // console.log(product);

  return (
    <>
      <Link className="productCard" to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <Rating readOnly defaultValue={product.ratings} />
        <div>{/* <span className="productCardSpan">(34 Reviews)</span> */}</div>
        <span>{`₹${product.price}`}</span>
      </Link>
    </>
  );
}

export default Product;
