const app = require("./app");
const dotenv = require("dotenv");
const connectDataBase = require("./config/dataBase");
const cloudinary = require("cloudinary");
// HANDLING UNCAUGTH EXCEPTION

process.on("uncaughtException", (err) => {
  console.log(`error:${err}`);
  console.log("shuting down the server duo to  HANDLING UNCAUGTH EXCEPTION ");

  process.exit(1);
});

// config

dotenv.config({ path: "backend/config/config.env" });

// conextion with database

connectDataBase();

cloudinary.config({
  cloud_name: process.env.CLOUDINART_NAME,
  api_key: process.env.CLOUDINART_API,
  api_secret: process.env.CLOUDINART_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is start on http://localhost:${process.env.PORT} `);
});

// UNHANDLED PROMISE REJECTION

process.on("unhandledRejection", (err) => {
  console.log(`error:${err}`);
  console.log("shuting down the server duo to UNHANDLED PROMISE REJECTION");

  server.close(() => {
    process.exit(1);
  });
});
