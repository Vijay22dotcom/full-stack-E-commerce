// SpecialDeals.js
import React from "react";

const SpecialDeals = () => {
  const specialDeals = [
    {
      id: 1,
      name: "Gaming Console Bundle",
      discount: "15%",
      image: "console.jpg",
    },
    { id: 2, name: "Fitness Tracker", discount: "20%", image: "fitness.jpg" },
    {
      id: 3,
      name: "Kitchen Appliance Set",
      discount: "10%",
      image: "kitchen.jpg",
    },
    { id: 4, name: "Smart Watch", discount: "25%", image: "watch.jpg" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Special Deals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {specialDeals.map((deal) => (
          <div
            key={deal.id}
            className="border p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={`/images/${deal.image}`}
              alt={deal.name}
              className="mb-4 w-full h-32 object-cover"
            />
            <p className="text-lg font-bold mb-2">{deal.name}</p>
            <p className="text-gray-600">Discount: {deal.discount}</p>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
              View Deal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialDeals;
