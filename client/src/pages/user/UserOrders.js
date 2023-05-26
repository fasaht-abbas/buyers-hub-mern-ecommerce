import React, { useState, useEffect } from "react";
import Wrapper from "../../components/Layout/Wrapper";
import UserMenu from "./UserMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../context/auth";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/order/user-orders`
      );
      setOrders(data?.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Wrapper>
      <div className="container-fluid align-items-center mt-4 h-75 vh-70 text-norm">
        <div className="row ">
          <div className="col-md-3 m-3 p-3">
            <UserMenu />
          </div>
          <div className=" col-md-8 m-2 mb-4 p-4 ">
            <h1 className="text-center mb-4 mt-2">All orders</h1>
            <div className="box-shadow">
              {orders?.map((o, i) => {
                return (
                  <>
                    <table className="table box-shadow">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Status</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Time</th>
                          <th scope="col">items</th>
                          <th scope="col">Order Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{o?.status}</td>
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
                              <h6>quantity : {item.amount}</h6>
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

export default UserOrders;
