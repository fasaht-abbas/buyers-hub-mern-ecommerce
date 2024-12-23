import AdminMenu from "./AdminMenu";
import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Layout/Wrapper";
import { apiClient } from "../../utils/AxiosInterceptor";
import moment from "moment";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
import toast from "react-hot-toast";
const { Option } = Select;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [status] = useState([
    "Not Processing",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]);

  ////// getting all the orders on the admins end
  const getAllOrders = async () => {
    try {
      const { data } = await apiClient.get("/api/v1/order/admin-orders");
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getAllOrders();
  }, [auth?.token]);

  //////////////////////////////////////////////////   Updating THE STATUS
  const updateStatus = async (id, value) => {
    try {
      const { data } = await apiClient.put("/api/v1/order/update-status", {
        id,
        value,
      });
      getAllOrders();
      toast.success("status updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="container-fluid align-items-center mt-4 mb-4 text-norm">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <AdminMenu />
          </div>

          <div className=" col-md-8 m-2 mb-4 p-4  ">
            <h1 className="text-center mb-4 mt-2 display-5">All Orders</h1>
            <div className="box-shadow">
              {orders?.map((o, i) => {
                return (
                  <>
                    <table className="table mt-4">
                      <thead className="table-dark text-center">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Status</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Time</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Shipping Address</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <th scope="col">{i + 1}</th>
                          <td>{o?.buyer?.name}</td>
                          <td>
                            <Select
                              style={{ width: "120px" }}
                              className="text-norm"
                              bordered={false}
                              onChange={(value) => updateStatus(o._id, value)}
                              defaultValue={o?.status}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{o?.payment.success ? "Success" : "false"}</td>
                          <td>{moment(o?.createdAt.toString()).fromNow()}</td>
                          <td>{o?.items.length}</td>
                          <td>{o?.orderAddress}</td>
                        </tr>
                      </tbody>
                    </table>
                    {o?.items.map((item) => {
                      return (
                        <>
                          <div className="card d-flex flex-row row mb-2">
                            <div className="col-md-4 mb-2">
                              {
                                <img
                                  style={{ height: "210px" }}
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item.product._id}`}
                                  className="card-img-top"
                                  alt={item.product.name}
                                />
                              }
                            </div>
                            <div className="mb-2 col-md-8 mt-4">
                              <h4>Name {item.product.name}</h4>
                              <h6>Price : $ {item.product.price}</h6>
                              <h6>Description : {item.product.description}</h6>
                              <h6>Quantity : {item.amount}</h6>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminOrders;
