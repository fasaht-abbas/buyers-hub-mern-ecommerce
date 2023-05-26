import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
//createProductController

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //Validation

    switch (true) {
      case !name:
        res.status(404).send({ success: false, message: "name is required" });
      case !description:
        res
          .status(404)
          .send({ success: false, message: "description is required" });
      case !price:
        res.status(404).send({ success: false, message: "price is required" });
      case !category:
        res
          .status(404)
          .send({ success: false, message: "category is required" });
      case !quantity:
        res
          .status(404)
          .send({ success: false, message: "quantity is required" });
      case photo && photo.size > 1000000:
        res.status(404).send({
          success: false,
          message: "photo is required and should be less than 1 mb",
        });
    }
    const product = new productModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "new product created",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Product not created",
    });
  }
};

//getAllProducts

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      Total_Products: allProducts.length,
      success: true,
      message: "these are all the products",
      allProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      msessage: "could not get all the products",
    });
  }
};

//getSingleProducts

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProduct = await productModel
      .findOne({ _id: id })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Found Single Product",
      singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Could not find single prodduct",
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const dltProduct = await productModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete this Product",
    });
  }
};

// Update product

export const updateProduct = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //Validation

    switch (true) {
      case !name:
        return res
          .status(404)
          .send({ success: false, message: "name is required" });
      case !description:
        return res
          .status(404)
          .send({ success: false, message: "description is required" });
      case !price:
        return res
          .status(404)
          .send({ success: false, message: "price is required" });
      case !category:
        return res
          .status(404)
          .send({ success: false, message: "category is required" });
      case !quantity:
        return res
          .status(404)
          .send({ success: false, message: "quantity is required" });
      case photo && photo.size > 3000000:
        return res.status(404).send({
          success: false,
          message: "photo is required and should be less than 1 mb",
        });
    }
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(
      id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      success: true,
      message: "product updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Product not updated",
    });
  }
};

//Get Photo

export const getProductPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const productPhoto = await productModel.findById(id).select("photo");
    if (productPhoto.photo.data) {
      res.set("Content-type", productPhoto.photo.contentType);
      res.status(200).send(productPhoto.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Could not get Photo",
      error,
    });
  }
};

////////////////////////////Filter controller   with the build in pagination

export const filterController = async (req, res) => {
  try {
    const { checked, radio, currentFilterPage } = req.body;
    const filterPageSize = 6;
    const skip = (currentFilterPage - 1) * filterPageSize;
    // querry for filtering the products

    let querry = {};
    if (checked.length > 0) querry.category = checked;
    if (radio.length) querry.price = { $gte: radio[0], $lte: radio[1] };

    //   getting the count of produts when filtered
    const filterProductCount = await productModel
      .find(querry)
      .select("-photo")
      .countDocuments();
    console.log(filterProductCount);
    const fpc = Math.ceil(filterProductCount / filterPageSize);
    //   getting the paginated filtered Products
    const filtered = await productModel
      .find(querry)
      .select("-photo")
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(filterPageSize);
    console.log(fpc);
    res.status(200).send({
      success: true,
      filterProductCount,
      fpc,
      filterPageSize,
      filtered,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in the filter products Functionality",
      success: false,
    });
  }
};

// productCounterController (pagination with getting Products)

export const productCounterController = async (req, res) => {
  try {
    const { currentPage } = req.body;
    const pageSize = 6;
    const skip = (currentPage - 1) * pageSize;
    const productCount = await productModel
      .find({})
      .select("-photo")
      .countDocuments();
    const pageCount = Math.ceil(productCount / pageSize);
    const pageItems = await productModel
      .find({})
      .select("-photo")
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(pageSize);

    res.status(200).send({
      success: true,
      productCount,
      pageCount,
      pageItems,
      pageSize,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in the Product Counter",
    });
  }
};

//  SEARCH CONTROLLER

export const searchController = async (req, res) => {
  try {
    const { keywords } = req.params;
    const searchResult = await productModel
      .find({
        $or: [
          { name: { $regex: keywords } },
          { description: { $regex: keywords } },
        ],
      })
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      searchResult,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error in the search Controller",
    });
  }
};

///////////////////////////////      SIMILAR products

export const similarProductController = async (req, res) => {
  try {
    const { id, category } = req.body;
    const similarProducts = await productModel
      .find({ category: category, _id: { $ne: id } })
      .select("-photo")
      .limit(4);
    res.status(200).send({
      success: true,
      similarProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in getting the related products",
      error,
    });
  }
};

export const updateAmountController = async () => {
  try {
    const { _id, newAmount } = req.body;
    const updated = await productModel.findByIdAndUpdate(
      _id,
      { amount: newAmount },
      { new: true }
    );
    res.status(200).send({
      success: true,
      updated,
    });
  } catch (error) {
    console.log(error);
  }
};
