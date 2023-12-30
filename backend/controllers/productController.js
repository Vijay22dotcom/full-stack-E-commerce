const catchAsyncError = require("../middleWare/catchAsyncError"); // this is funcation and its take aragument as all  funcanality
const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apiFeature");
const ErrorHandler = require("../utils/errorHandler");
const fs = require("fs");

const cloudinary = require("cloudinary");
const User = require("../model/userModel");
// create product --ADMIN

exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id; // ADD ID OF ADMIN  WHICH ADMIN DO THIS

  const imagesLink = [];

  for (const file of req.files.images) {
    const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "productImages",
      width: 500,
      crop: "scale",
    });

    await imagesLink.push({
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    });

    fs.unlinkSync(file.tempFilePath);

    req.body.images = imagesLink;
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// GET ALL PRODUCT

exports.getAllProduct = catchAsyncError(async (req, res, next) => {
  // const resultPerPage = 10;

  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  // .pagination(resultPerPage);

  const products = await apiFeatures.query;
  if (!products) {
    return next(new ErrorHandler("product not fount ", 404));
  }

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// GET ALL PRODUCT

exports.getCartProducts = catchAsyncError(async (req, res, next) => {
  const idArray = Object.values(req.body);
  // console.log(idArray);

  const products = await Product.find({ _id: { $in: idArray } });
  // console.log("product", products);

  if (!products) {
    return next(new ErrorHandler("product not fount ", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// GET ALL PRODUCT --ADMIN

exports.getAllProductsAdmin = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// GET SINGLE PRODUCT FOR DETAIL

exports.getOneProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  //  THIS IS WITHOUT ERRORHANDLE FUNCATION

  // if(!product){
  //     return res.status(500).json({
  //         success:false,
  //         message:"product not fount "
  //     })
  // }

  // THIS IS BY ERRORHADLER FUNCATION

  if (!product) {
    return next(new ErrorHandler("product not  fount ", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// GET CATEGORY LIST

exports.getProductsCategoryList = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  const categoryLists = products.map((product) => {
    return product.category;
  });
  const categoryList = Array.from(new Set(categoryLists.flat()));
  // console.log(categoryList);

  res.status(200).json({
    success: true,
    // product,
    categoryList,
  });
});

// FIND BY CATEGORY
exports.getProductsByCategory = catchAsyncError(async (req, res, next) => {
  const { category } = req.body;
  // console.log(req.body);
  const products = await Product.find({ category });
  // console.log(req.body);

  if (!products) {
    return next(new ErrorHandler("product not fount ", 404));
  }
  res.status(200).json({
    success: true,
    products,
  });
});

// UPDATE PRODUCT -- ADMIN

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  // console.log(req.body);
  // console.log(req.files);

  if (!product) {
    return next(new ErrorHandler("product not fount ", 404));
  }

  for (const image of product.images) {
    await cloudinary.v2.uploader.destroy(image.public_id);
  }

  const imagesLink = [];

  for (const file of req.files.images) {
    const myCloud = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "productImages",
      width: 500,
      crop: "scale",
    });

    await imagesLink.push({
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    });

    fs.unlinkSync(file.tempFilePath);

    req.body.images = imagesLink;
  }

  // console.log(req.body);

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  // console.log(product);
  res.status(200).json({
    success: true,
    product,
  });
});

// DELETE PRODUCT -- ADMIN
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not fount ", 404));
  }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "product delete successful",
  });
});

// CREATE PRODUCT-REVIEW OR UPDATE

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId, title } = req.body;
  // console.log(req.body);

  const review = {
    user: req.user._id,
    name: req.user.name,
    comment,
    rating: Number(rating),
    productId,
    title,
  };

  // console.log(review);

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        (rev.comment = comment), (rev.rating = rating), (rev.title = title);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // PRODUCT RATING
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "review submit successfuly",
  });
});

// GET ALL REVIEW

exports.getProductReview = catchAsyncError(async (req, res, next) => {
  // console.log(req);
  const product = await Product.findById(req.query.id);
  // console.log(product);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// DELETE REVIEW

exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "review delete successfuly",
  });
});
