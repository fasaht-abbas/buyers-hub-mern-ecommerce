import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddlewares.js ";
import {
  allCategoriesController,
  createCategoryController,
  deleteCategory,
  singleCategoryController,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

//Routes

//CREATE CATEGORY
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//UPDATE CATEGORY
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategory);

//DELETE CATEGORY
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

//SHOW ALL CATEGORIES
router.get("/all-categories", allCategoriesController);

// single category
router.get("/single-category/:slug", singleCategoryController);

export default router;
