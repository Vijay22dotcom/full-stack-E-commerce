import React, { useRef, useState } from "react";
import Sidebar from "./SideBar";
import {
  addNewProduct,
  isloading,
  uploadLoading,
} from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../contex/alert/AlertContex";

const AddProduct = () => {
  const dispatch = useDispatch();

  const loading = useSelector(uploadLoading);
  // console.log(loading);

  const { showAlert } = useAlert();
  const submitBtn = useRef(null);

  const [imagesPreview, setImagesPreview] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
  });

  const handleFileChange = (e) => {
    const Files = e.target.files;
    const imagesFiles = Array.from(Files);
    console.log(imagesFiles);
    setImagesPreview([]);

    imagesFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((pre) => [...pre, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });

    console.log(imagesPreview);

    // console.log("Is Avatar a File?", avatar instanceof File);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    submitBtn.current.disabled = true;
    console.log("Product Data:", productData);
    const fromData = new FormData(e.currentTarget);
    // console.log([...fromData.entries()]);
    const data = await dispatch(addNewProduct(fromData)).then((result) => {
      return result.payload.data;
      // console.log(result);
    });

    if (data.success) {
      showAlert("Product add successfully", "success");
      submitBtn.current.disabled = false;
    } else {
      showAlert("something is wrong", "error");
      submitBtn.current.disabled = false;
    }
    // Reset form after submission if needed
    setProductData({
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
    });

    setImagesPreview([]);
  };
  return (
    <>
      <div className="   flex   font-serif   ">
        <div className="w-[20%] max-[800px]:w-[30%] bg-[#1C2536]  ">
          <Sidebar />
        </div>
        <div className=" w-[80%]  max-[800px]:w-[70%] bg-gray-200   p-[20px]">
          <div className="max-w-md  font-sans mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-600"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-600"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows="3"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-600"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-600"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-600"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  accept="image/*"
                />
              </div>

              <div className="flex  mb-4 overflow-auto ">
                {imagesPreview.map((img, index) => {
                  return (
                    <img
                      src={img}
                      alt="img"
                      key={index}
                      className="w-[100px] mr-[10px] rounded-md  "
                    />
                  );
                })}
              </div>
              <button
                type="submit"
                className=" flex justify-center w-[100%] bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                ref={submitBtn}
              >
                {loading ? "loading.." : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
