import React from "react";

import "./Foorter.css";

const Footer = () => {
  return (
    <footer
      id="footer"
      class="bg-gray-900 text-white p-[50px]   max-[700px]:p-2    "
    >
      <div class="flex justify-between w-[100%] max-[550px]:flex-col-reverse items-center">
        <div class="flex flex-col items-center mr-8  max-[700px]:mr-3 max-[550px]:mb-4 ">
          <h4 class="text-lg font-bold mb-2">DOWNLOAD OUR APP</h4>
          <p class="text-sm  ">Download App for Android and IOS mobile phone</p>
          {/* Add your images with Tailwind CSS classes here */}
        </div>

        <div class="flex flex-col items-center max-[550px]:mb-4">
          <h1 class="text-2xl font-bold mb-2">ECOMMERCE.</h1>
          <p class="text-sm mb-2">High Quality is our first priority</p>
          <p class="text-sm">Copyrights 2023 &copy; Me</p>
        </div>

        <div class="flex flex-col items-center ml-8 max-[700px]:ml-3 max-[550px]:mb-4 ">
          <h4 class="text-lg font-bold mb-2 max-[700px]:text-[14px]  ">
            Follow Us
          </h4>
          <a href="http://instagram.com" class="text-blue-500  hover:underline">
            Instagram
          </a>
          <a href="http://youtube.com" class="text-blue-500 hover:underline">
            Youtube
          </a>
          <a href="http://facebook.com" class="text-blue-500 hover:underline">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
