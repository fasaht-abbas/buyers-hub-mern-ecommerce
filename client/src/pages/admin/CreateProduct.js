import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Layout/Wrapper";
import AdminMenu from "./AdminMenu";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState();

  // GETTING ALL THE CATEGORIES
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-categories");
      if (data?.success) {
        setCategories(data.allCategories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("photo", photo);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);

      const res = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (res.data.success) {
        toast.success("product created successfully");
        setName("");
        setPhoto("");
        setCategory("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setShipping("");
        navigate("/dashboard/admin/all-products");
      } else {
        toast.error("product not created");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Wrapper title="Create-Products-Admin- Dashboard - Buyers Hub ">
      <div className="container-fluid align-items-center mt-4 mb-4 text-norm">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <AdminMenu />
          </div>
          <div className=" col-md-8 m-2 mb-4 p-4  ">
            <h1 className="text-center mb-4 mt-2 display-5">Create Products</h1>
            <div className="mb-3">
              <p class>Select Category</p>
              <Select
                bordered={false}
                size="large"
                placeholder="Select any category"
                optionFilterProp="children"
                className="form-control mb-3"
                onChange={(value) => setCategory(value)}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              {/* // photo upload */}
              <div className="mb-3">
                <p>Upload a photo</p>
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? (
                    photo.name
                  ) : (
                    <i className="bi bi-card-image "> add Photo</i>
                  )}
                  <input
                    type="file"
                    name="photo"
                    className="col-md-12"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3" style={{ height: "15vh" }}>
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="img-product"
                      width={"200px"}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <p>Product name</p>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control input-text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <p>Product description</p>
                <textarea
                  type="text"
                  placeholder="Description"
                  className="form-control input-text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p>Quantity in Stock</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  className="form-control input-text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p>Price ($)</p>
                <input
                  type="number"
                  placeholder="Price"
                  className="form-control input-text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p>Shipping Availability</p>
                <Select
                  bordered={false}
                  placeholder="Shipping"
                  className="form-control md-3"
                  onChange={(value) => setShipping(value)}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </div>
              <div className="d-grid gap-2 col-12 mx-auto">
                <button
                  type="button"
                  className="btn btn-update "
                  onClick={handleCreate}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
