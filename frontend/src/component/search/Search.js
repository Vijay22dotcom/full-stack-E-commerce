import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideSearch, setKeywords } from "../../features/search/searchSlice";
import { AiOutlineSearch } from "react-icons/ai";
import {
  Searchproducts,
  fetchProductByKeyword,
} from "../../features/product/productSlice";
import { useNavigate } from "react-router-dom";

const Search = ({ keyword, w = "30vw" }) => {
  const dispatch = useDispatch();
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);

  // const [key, setKey] = useState(keyword);
  const navigate = useNavigate();
  const price = [0, 10000000];
  useEffect(() => {
    // console.log(keyword);
    dispatch(fetchProductByKeyword({ keyword, price }));
  }, [dispatch, keyword]);

  const product = useSelector(Searchproducts);
  // console.log(product);

  const handlelist = (e) => {
    e.stopPropagation();
  };

  const hansleSearchBlock = (e) => {
    e.stopPropagation();
    dispatch(hideSearch());
  };
  return (
    <>
      <div
        className={`w-[${w}] h-[50vh]   bg-white   rounded overflow-hidden `}
      >
        {product.map((product) => (
          <div
            className="flex  hover:bg-gray-300  mt-[2px]  "
            // onMouseOver={() => dispatch(setKeywords(product.name))}
            onClick={() => navigate(`/products/search/${product.name}`)}
          >
            <h2
              className="text-black p-[5px] ml-5 
            
            "
            >
              {product.name}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
