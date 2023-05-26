import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js ";
import {
  createProductController,
  deleteProduct,
  filterController,
  getAllProducts,
  getProductPhoto,
  getSingleProduct,
  productCounterController,
  searchController,
  similarProductController,
  updateProduct,
} from "../controllers/productControllers.js";
import formidable from "express-formidable";

const router = express.Router();
//ROUTES

// create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get all products
router.get("/all-products", getAllProducts);

//get single product
router.get("/single-product/:id", getSingleProduct);

//Get Photo
router.get("/product-photo/:id", getProductPhoto);

//Delete product
router.delete("/delete-product/:id", requireSignIn, isAdmin, deleteProduct);

router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProduct
);

// THis is For the filterd Products
router.post("/filtered-products", filterController);

//product-Counter
router.post("/product-pagination", productCounterController);

// Handle Search
router.get("/search/:keywords", searchController);

// similar Products
router.post("/similar-products", similarProductController);

export default router;
