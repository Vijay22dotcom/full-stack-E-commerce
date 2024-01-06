import React from "react";
import { Link } from "react-router-dom";
import "./about.css";

const AboutUs = () => {
  return (
    <div className="container mx-auto mt-8 text-center px-[200px]  py-[50px] max-[800px]:px-[100px] max-[500px]:px-[50px]  ">
      <h1 className="text-4xl font-semibold mb-4 animate__animated animate__fadeInDown">
        About Us
      </h1>
      <p className="mb-4  text-[20px] animate__animated animate__fadeInUp animated fadeInUp">
        Welcome to VR E-commerce Your Go-To Destination for Trendsetting
        Products!
      </p>
      <p className="mb-4 animate__animated animate__fadeInUp animated fadeInUp">
        Discover a world of style, quality, and convenience at VR E-commerce.
        With a carefully curated selection, secure shopping, and speedy
        shipping, we're here to redefine your shopping experience. Explore the
        latest trends with us and make every purchase a delight. Welcome to the
        VR E-commerce family where shopping meets satisfaction!
        <Link
          to="/contact"
          className="text-blue-500 hover:underline transition"
        >
          questions
        </Link>
        or
        <Link
          to="/contact"
          className="text-blue-500 hover:underline transition"
        >
          suggestions
        </Link>
        .
      </p>
      <p className=" text-[20px] animate__animated animate__fadeInUp animated fadeInUp ">
        Thank you for being a part of our community! 🌟
      </p>
    </div>
  );
};

export default AboutUs;
