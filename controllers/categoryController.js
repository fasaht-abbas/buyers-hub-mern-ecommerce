import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.send({
        success: false,
        message: "Enter A category Name to Proceed",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      res.send({
        success: false,
        messege: "Category Already exists",
      });
    }
    const category = await new categoryModel({
      name: name,
      slug: slugify(name),
    }).save();
    res.send({
      success: true,
      message: "New Category Created",
    });
  } catch (error) {
    console.log(error);
  }
};

// Update Category || PUT

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error in updating the category",
      error,
    });
  }
};

// get all categories
export const allCategoriesController = async (req, res) => {
  try {
    const allCategories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "These are all the categories",
      allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "errort in showing all categories",
    });
  }
};

//Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const dltCategory = await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      mesage: "the category has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Category not deleted",
    });
  }
};

//singleCategoryController

export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const singleCategory = await categoryModel.findOne({ slug });
    return res.status(200).send({
      success: true,
      message: "Single category",
      singleCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Could not find this category",
    });
  }
};
