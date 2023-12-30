import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contactUs, isLoadingForUpload } from "../../features/auth/authSlice";
import { useAlert } from "../../contex/alert/AlertContex";

const Contact = () => {
  const [sendData, setSendData] = useState({});
  const { showAlert } = useAlert();

  const uploadLoading = useSelector(isLoadingForUpload);
  const dispatch = useDispatch();
  const handleInput = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
    // console.log(sendData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(sendData);
    const data = await dispatch(contactUs(sendData)).then((result) => {
      return result.payload.data;
    });

    if (data.success) {
      showAlert(data.message, "success");
    } else {
      showAlert(data.message, "error");
    }
    setSendData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <div className="bg-gray-200">
      <div className="container mx-auto  p-8 bg-gray-200 shadow-md rounded-md">
        <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">
          Contact Us
        </h1>
        <p className="mb-8 text-center text-gray-600 font-semibold ">
          Have questions or suggestions? Feel free to reach out to us using the
          form below.
        </p>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block ml-[5px] text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInput}
              value={sendData.name}
              className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block ml-[5px] text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={sendData.email}
              onChange={handleInput}
              className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block ml-[5px] text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={sendData.message}
              onChange={handleInput}
              className="border-2 border-gray-300 p-3 w-full rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your Message"
            ></textarea>
          </div>
          <div className="w-[100%] text-center m-auto ">
            <button
              type="submit"
              className="bg-blue-500 w-[30%]   text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              {uploadLoading ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
