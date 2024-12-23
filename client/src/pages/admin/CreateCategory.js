import React from "react";
import Wrapper from "../../components/Layout/Wrapper";
import AdminMenu from "./AdminMenu";
import { useState, useEffect } from "react";
import { apiClient } from "../../utils/AxiosInterceptor";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);
  const [deleteVisible, setDeleteVisible] = useState(false);

  ////////////////////////////////////////////Submitm Handle Ctegory Form//////////////////

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post(
        "/api/v1/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} created successfully`);
        getAllCategories();
        setName("");
      } else {
        return toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  // GETTING ALL THE CATEGORIES
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
  }, []);

  /////////////////////////////Handle the category Update

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} has been updated`);
        getAllCategories();
        setSelected(null);
        setUpdatedName("");
        setUpdateVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  ////////////////////////////////////////    DELETE HANDLER
  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.delete(
        `/api/v1/category/delete-category/${selected._id}`
      );
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategories();
        setSelected(null);
        setDeleteVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Wrapper title="Create-Category-Admin- Dashboard - Buyers Hub ">
      <div className="container-fluid align-items-center mt-4 mb-4 text-norm">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 m-2 mb-4 p-4  ">
            <h1 className="text-center mb-4 mt-2 display-5">
              Manage Categories
            </h1>
            <div className="col-md-12">
              <p className="text-norm lead text-center">
                Create a new Category
              </p>
              <CategoryForm
                value={name}
                className={"input-text"}
                setValue={setName}
                submitHandler={submitHandler}
                btnName={<i className="bi bi-plus-circle"></i>}
              />
              <div className="row justify-content-center mt-4 ">
                <div className="col-10">
                  <table className="table table-responsive">
                    <tbody>
                      {categories.map((c) => (
                        <tr key={c._id}>
                          <td className="align-middle">{c.name}</td>
                          <td align="right">
                            <button
                              type="button"
                              className="btn m-2 btn-update"
                              onClick={() => {
                                setUpdateVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger m-2"
                              onClick={() => {
                                setDeleteVisible(true);
                                setSelected(c);
                              }}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* UPdate MODAL  */}
            <Modal
              onCancel={() => setUpdateVisible(false)}
              footer={null}
              open={updateVisible}
            >
              <div className="col-md-10">
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  submitHandler={handleUpdate}
                  btnName={"Update"}
                />
              </div>
            </Modal>
            {/* /// DELETE MODEL  */}
            <Modal
              onCancel={() => setDeleteVisible(false)}
              footer={null}
              open={deleteVisible}
            >
              <h6>Are you sure you want to delete this category</h6>
              <button
                type="submit"
                className="btn btn-danger"
                onClick={deleteHandler}
              >
                Delete
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateCategory;
