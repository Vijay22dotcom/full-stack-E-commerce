// FeaturedProducts.js
import React from "react";

const FeaturedProducts = () => {
  const featuredProducts = [
    { id: 1, name: "Smartphone X", price: 699, image: "phone.jpg" },
    { id: 2, name: "Laptop Pro", price: 1299, image: "laptop.jpg" },
    { id: 3, name: "Camera Z", price: 499, image: "camera.jpg" },
    { id: 4, name: "Headphones 360", price: 149, image: "headphones.jpg" },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={`/images/${product.image}`}
              alt={product.name}
              className="mb-4 w-full h-32 object-cover"
            />
            <p className="text-lg font-bold mb-2">{product.name}</p>
            <p className="text-gray-600">${product.price}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
