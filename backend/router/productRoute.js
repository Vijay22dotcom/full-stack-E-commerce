const {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
  createProductReview,
  getProductReview,
  deleteProductReview,
  getProductsByCategory,
  getProductsCategoryList,
  getAllProductsAdmin,
  getCartProducts,
} = require("../controllers/productController");

const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleWare/auth");

const router = express.Router();

router.route("/products").get(getAllProduct);
router.route("/products/categorylist").get(getProductsCategoryList);
router.route("/products/category").post(getProductsByCategory);

router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProductsAdmin);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getOneProduct);

router.route("/cartproducts").post(isAuthenticatedUser, getCartProducts);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/review")
  .get(getProductReview)
  .delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
