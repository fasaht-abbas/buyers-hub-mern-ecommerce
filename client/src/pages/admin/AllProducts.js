import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Layout/Wrapper";
import AdminMenu from "./AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/all-products");
      if (data.success) {
        setProducts(data.allProducts);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifeline technique

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Wrapper title="All-Products-Admin- Dashboard - Buyers Hub ">
      <div className="container-fluid align-items-center mt-4 mb-4n text-norm">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <AdminMenu />
          </div>
          <div className=" col-md-8 m-2 mb-4 p-4  ">
            <p className="text-center mb-4 mt-2 text-norm display-5">
              All Products
            </p>
            <div className="text-center d-flex flex-wrap justify-content-center">
              {products.map((p) => (
                <div key={p._id} className="card img-card m-1">
                  <div
                    className=" mx-auto mt-3"
                    style={{
                      height: "240px",
                      width: "240px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      style={{ height: "100%", width: "100%" }}
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top c-p-image"
                      alt={p.name}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-norm">
                      {p.name.substring(0, 15)}...
                    </h5>
                    <p className="card-text text-norm">
                      {p.description.substring(0, 25)}...
                    </p>
                    <p className="card-text">${p.price}</p>
                  </div>

                  <div className="mb-2">
                    <button
                      className=" btn btn-update"
                      onClick={() =>
                        navigate(`/dashboard/admin/update-product/${p._id}`)
                      }
                    >
                      edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AllProducts;
