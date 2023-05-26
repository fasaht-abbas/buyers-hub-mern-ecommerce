import React, { useState, useEffect } from "react";
import Wrapper from "../components/Layout/Wrapper";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [instance, setInstance] = useState();
  const [clientToken, setClientToken] = useState("");
  const [orderAddress, setOrderAddress] = useState();
  const [loading, setLoading] = useState(false);

  // amount of the same products

  const totalPrice = () => {
    let total = 0;
    cart.map((c) => {
      total = c.price * c.amount + total;
    });
    return total.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
  };

  //////////////////////////////// TO DELETE THE CART ITEM

  const deleteCartItem = (p) => {
    p.amount = 1;
    const myCart = [...cart];
    let index = myCart.findIndex((c) => c._id === p._id);
    myCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(myCart));
    setCart(myCart);
  };
  //////////////////////////////// TO increase the amount of product

  const increaseCartItem = (p) => {
    if (p.amount < p.quantity) {
      p.amount += 1;
      const myCart = [...cart];
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } else {
      toast.error("out of stock");
    }
  };
  //////////////////////////////// TO decrease the amount of product

  const decreaseCartItem = (p) => {
    if (p.amount > 1) {
      p.amount = p.amount - 1;
      const myCart = [...cart];
      localStorage.setItem("cart", JSON.stringify(myCart));
      setCart(myCart);
    } else {
      toast.error("Order Alteast One item");
    }
  };

  /// GETTING THE CLIENT TOKEN FOR THE PAYMENT
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  ////// handlePayment

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/order/braintree/payment", {
        cart,
        nonce,
        orderAddress,
      });
      {
        localStorage.removeItem("cart");
        setCart([]);
        setOrderAddress("");
        navigate("/dashboard/user/orders");
        setLoading(false);
        toast.success("The order has been made");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="d-flex justify-content-center text-norm">
        <div className="container row mb-2 mt-4  ">
          <div className="text-center mb-2">
            <h5>
              {cart.length > 0
                ? `${cart.length} items selected`
                : "No items Selected"}
            </h5>

            <h6>
              {cart.length > 0
                ? auth?.user
                  ? `${auth.user.name} please proceed to check out to make an order`
                  : "please login first to make an order"
                : "Please select some items first"}
            </h6>
          </div>
          <div className="col-md-8 row mb-2">
            {cart?.map((p) => (
              <div key={p._id} className="d-flex flex-row row mb-2">
                <div className="col-md-5 mb-2">
                  {
                    <img
                      style={{ height: "210px" }}
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  }
                </div>
                <div className="col-md-6 mb-2 mt-4">
                  <h4>Name {p.name}</h4>
                  <h6>Price : $ {p.price}</h6>
                  <h6>Description : {p.description}</h6>
                  <h6>
                    amount :{" "}
                    <div className="d-flex flex-wrap mx-auto m-2">
                      <button
                        className="btn btn-secondary btn-sm m-1"
                        disabled={p.amount <= 1 ? true : false}
                        onClick={() => {
                          decreaseCartItem(p);
                        }}
                      >
                        -
                      </button>
                      <div
                        className=" p-2 text-center"
                        style={{ width: "30px" }}
                      >
                        {p.amount}
                      </div>
                      <button
                        className="btn btn-secondary btn-sm m-1"
                        disabled={p.amount < p.quantity ? false : true}
                        onClick={() => {
                          increaseCartItem(p);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </h6>
                  <h6>instock : {p.quantity - p.amount}</h6>
                </div>
                <div className="col-md-1 mt-4">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteCartItem(p);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <hr />
          </div>
          <div className="col-md-4 ">
            <div className="mt-2 card p-4">
              <h5>Cart Summary</h5>
              <h6>TOTAL | PAYMENT </h6>
              <hr />
              TOTAL : {totalPrice()}
              {!clientToken || !cart.length ? (
                ""
              ) : (
                <>
                  <div className="mb-3">
                    <p className="lead"> Order Address</p>
                    <input
                      type="text"
                      placeholder="Enter order address"
                      required
                      value={orderAddress}
                      className="form-control input-text"
                      onChange={(e) => setOrderAddress(e.target.value)}
                    />
                  </div>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button className="btn-primary mt-2" onClick={handlePayment}>
                    {loading ? <Loading /> : "Order Now"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
