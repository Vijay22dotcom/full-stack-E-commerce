const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const corsConfig = {
  origin: true,
  credentials: true,
};
const app = express();

// config

dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// router import
const product = require("./router/productRoute");
const user = require("./router/userRoute");
const order = require("./router/orderRoute");
const errorMiddleware = require("./middleWare/error");
const payment = require("./router/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// ERROR MIDELEWARE

app.use(errorMiddleware);

module.exports = app;
