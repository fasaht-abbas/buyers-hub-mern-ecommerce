import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Layout/Wrapper";
import AdminMenu from "./AdminMenu";
import { Select } from "antd";
import { apiClient } from "../../utils/AxiosInterceptor";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [photo, setPhoto] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [shipping, setShipping] = useState();

  //Get the single product

  const getSingleProduct = async () => {
    try {
      const { data } = await apiClient.get(
        `/api/v1/product/single-product/${params.id}`
      );
      if (data.success) {
        setName(data.singleProduct.name);
        setPrice(data.singleProduct.price);
        setCategory(data.singleProduct.category);
        setQuantity(data.singleProduct.quantity);
        setDescription(data.singleProduct.description);
        setShipping(data.singleProduct.shipping);
      } else {
        console.log("error in getting single product");
      }
    } catch (error) {
      console.log(error);
      toast.error(`cannot get ${params.id}`);
    }
  };
  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  //GET ALL CATEGORIES
  const getAllCategories = async () => {
    try {
      const { data } = await apiClient.get("/api/v1/category/all-categories");
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
    // eslint-disable-next-line
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      photo && productData.append("photo", photo);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);

      const res = await apiClient.put(
        `/api/v1/product/update-product/${params.id}`,
        productData
      );
      if (res.data.success) {
        toast.success("product Updated successfully");
        navigate("/dashboard/admin/all-products");
      } else {
        toast.error("product not updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // handleDelete

  const handleDelete = async (req, res) => {
    try {
      const { data } = await apiClient.delete(
        `/api/v1/product/delete-product/${params.id}`
      );
      if (data.success) {
        toast.success("product deleted successfully");
        navigate("/dashboard/admin/all-products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("cannot delete product");
    }
  };

  return (
    <Wrapper title="Update-Products-Admin- Dashboard - Buyers Hub ">
      <div className="container-fluid align-items-center mt-4 mb-4  text-norm">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <AdminMenu />
          </div>
          <div className=" col-md-8 m-2 mb-4 p-4 ">
            <h1 className="text-center mb-4 mt-2 display-5">Update Product</h1>
            <div className="mb-3">
              <p class>Select Category</p>
              <Select
                bordered={false}
                size="large"
                placeholder="Select any category"
                showSearch
                optionFilterProp="children"
                className="form-control mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              {/* // photo upload */}
              <div className="mb-3">
                <p class>Select Picture</p>
                <label className="btn btn-outline-secondary col-md-12">
                  <input
                    type="file"
                    name="photo"
                    className="col-md-12"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                  {photo ? (
                    photo.name
                  ) : (
                    <i className="bi bi-card-image "> add Photo</i>
                  )}
                </label>
              </div>

              <div className="mb-3">
                <div className="text-center">
                  {photo ? (
                    <img
                      alt="img-product"
                      width={"200px"}
                      src={URL.createObjectURL(photo)}
                    />
                  ) : (
                    <img
                      alt="img-product"
                      width={"200px"}
                      src={`/api/v1/product/product-photo/${params.id}`}
                    />
                  )}
                </div>
              </div>

              <div className="mb-3">
                <p class>Name</p>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control input-text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <p class>Description</p>
                <textarea
                  type="text"
                  placeholder="Description"
                  className="form-control input-text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p class>Quantity in Stock</p>
                <input
                  type="number"
                  placeholder="Quantity"
                  className="form-control input-text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p class>Price ($)</p>
                <input
                  type="number"
                  placeholder="Price"
                  className="form-control input-text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <p class>Shipping</p>
                <Select
                  bordered={false}
                  placeholder="Shipping"
                  className="form-control md-3"
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Yes" : "No"}
                >
                  <Select.Option value="0">No</Select.Option>
                  <Select.Option value="1">Yes</Select.Option>
                </Select>
              </div>
              <div className="mb-3 ">
                <button
                  className="btn btn-update m-2 ml-0"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setDeleteModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
            <Modal
              open={deleteModalOpen}
              onCancel={() => {
                setDeleteModalOpen(false);
              }}
              footer={null}
            >
              <h6>Do you really want to delete this product?</h6>
              <div onClick={handleDelete} className="btn btn-danger">
                Delete
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdateProduct;
