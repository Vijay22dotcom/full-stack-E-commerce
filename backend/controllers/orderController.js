const Order = require("../model/orederModel");
const catchAsyncError = require("../middleWare/catchAsyncError"); // this is funcation and its take aragument as all  funcanality
const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    paymentInfo,
    iteamPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    shippingInfo,
    orderItems,
  } = req.body;

  // console.log(orderItems);

  const order = await Order.create({
    iteamPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    shippingInfo,
    orderItems,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//  GET SINDLE ORDER DETIAL
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("order not fount ", 404));
  }

  res.status(201).json({
    success: true,
    order,
  });
});

// GET LOGGING USER ALL ORDERR

exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new ErrorHandler("order not fount ", 404));
  }

  res.status(201).json({
    success: true,
    orders,
  });
});

// GET ALL ORDERR FOR ADMIN

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(201).json({
    success: true,
    totalAmount,
    orders,
  });
});

//  UPDATE PRODUCT  STOCK  AND UPDATE ORDER STATUS

exports.updateOrder = catchAsyncError(async (req, res, next) => {
  console.log(req);
  const order = await Order.findById(req.params.id);

  console.log(order);

  if (!order) {
    return next(new ErrorHandler("order not fount ", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("this order have already delivered  ", 400));
  }

  if (req.body.status === "shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o._id, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

// DELETE   ORDERR

exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("order not fount ", 404));
  }

  await order.deleteOne();
  res.status(201).json({
    success: true,

    order,
  });
});
