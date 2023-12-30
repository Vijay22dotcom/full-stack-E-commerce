import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-4xl font-semibold mb-4 animate__animated animate__fadeInDown">
        About Us
      </h1>
      <p className="mb-4 animate__animated animate__fadeInUp">
        Welcome to our website! We are a team of passionate individuals
        dedicated to providing valuable information and resources on various
        topics.
      </p>
      <p className="mb-4 animate__animated animate__fadeInUp">
        Our mission is to make knowledge accessible and enjoyable for everyone.
        Feel free to explore our content, and don't hesitate to reach out if you
        have any{" "}
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
      <p className="animate__animated animate__fadeInUp">
        Thank you for being a part of our community! 🌟
      </p>
    </div>
  );
};

export default AboutUs;
