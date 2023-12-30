import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./SideBar";
import {
  addNewProduct,
  fetchOneProduct,
  isloading,
  oneProduct,
  updateProduct,
  uploadLoading,
} from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../contex/alert/AlertContex";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { showAlert } = useAlert();
  const submitBtn = useRef(null);
  const loading = useSelector(uploadLoading);
  const product = useSelector(oneProduct);
  const navigate = useNavigate();
  console.log(product);
  console.log(product?.name);

  const [imagesPreview, setImagesPreview] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOneProduct(id));
    };

    fetchData();
    setName(product?.name || "");
  }, [dispatch, id]);

  useEffect(() => {
    // Set the name only when the product has been fetched
    setName(product?.name || "");
    setPrice(product?.price || "");
    setDescription(product?.description || "");
    setCategory(product?.category || "");
    setStock(product?.stock || "");
  }, [product]);

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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    submitBtn.current.disabled = true;
    // console.log("Product Data:", productData);
    const fromData = new FormData(e.currentTarget);
    console.log([...fromData.entries()]);
    const data = await dispatch(updateProduct({ fromData, id })).then(
      (result) => {
        return result.payload.data;
        // console.log(result);
      }
    );

    if (data.success) {
      showAlert("Product update successfully", "success");
      submitBtn.current.disabled = false;
      navigate("/admin/products");
    } else {
      showAlert("somoting wrong plese try later", "error");
      submitBtn.current.disabled = false;
    }

    console.log(data);

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
            <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
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
                  // defaultValue={product.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  // defaultValue={product?.price}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                  // defaultValue={product?.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  // defaultValue={product?.category}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  // defaultValue={product?.stock}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
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

              <div className="  ">
                <h2 className="text-lg font-semibold text-gray-700 ">
                  New images
                </h2>
                <div className="flex  mb-4 overflow-auto  ">
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
              </div>

              <div className=" ">
                <h2 className="text-lg font-semibold text-gray-700 ">
                  Old images
                </h2>
                <div className="flex  mb-4 overflow-auto ">
                  {product?.images?.map((img, index) => {
                    return (
                      <img
                        src={img.url}
                        alt="img"
                        key={index}
                        className="w-[100px] mr-[10px] rounded-md  "
                      />
                    );
                  })}
                </div>
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

export default EditProduct;
