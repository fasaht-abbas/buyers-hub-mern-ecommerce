import React, { useEffect, useState } from "react";
import Wrapper from "../components/Layout/Wrapper";
import { toast } from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { apiClient } from "../utils/AxiosInterceptor";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similar, setSimilar] = useState([]);

  const getDetails = async () => {
    try {
      const { data } = await apiClient.get(
        `/api/v1/product/single-product/${params.id}`
      );
      setProduct(data?.singleProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) getDetails();
  }, [params.id]);

  // increasing the Item, count
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

  /////////////////////////////////////////Related Products

  const getSimilarProducts = async () => {
    try {
      const { data } = await apiClient.post(
        "/api/v1/product/similar-products",
        {
          id: product._id,
          category: product.category,
        }
      );
      setSimilar(data.similarProducts);
    } catch (error) {
      console.log(error);
    }
  };

  // lifeline technique

  useEffect(() => {
    if (product) getSimilarProducts();
  }, [product]);

  const addToCart = (p) => {
    let myCart = [...cart];
    const some = myCart.some((s) => s._id === p._id);
    if (!some) {
      setCart([...cart, { ...p, amount: p.amount || 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...p, amount: p.amount || 1 }])
      );
      toast.success(`${p.name} added to cart`);
    } else {
      const newCart = cart.map((i) => {
        if (p._id === i._id) {
          if (i.amount < i.quantity) {
            i = { ...i, amount: i.amount + p.amount };
            toast.success(`${p.name} added again`);
          } else {
            toast.error("out of stock");
          }
        }
        return i;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const leftStock = (product) => {
    let myCart = [...cart];
    let obj = myCart.find((o) => o._id === product._id);
    if (obj) {
      return product.quantity - obj.amount - product.amount;
    } else {
      return product.quantity;
    }
  };

  // scrolling to the top
  const scroll = async () => {
    window.scrollTo({
      top: 0,
    });
  };
  useEffect(() => {
    scroll();
  }, [product]);

  return (
    <Wrapper>
      <div className="container-fuid row mt-2 text-norm p-5">
        <div
          className="col-md-4 mx-auto"
          style={{ height: "400px", width: "400px" }}
        >
          <img
            style={{ height: "100%", width: "100%" }}
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
          />
        </div>
        <div className="col-md-7 d-flex m-2 mx-auto">
          <div className="card-body align-self-center">
            <h5 className="card-title">{product.name}</h5>

            <h6>Price : $ {product.price}</h6>
            <h6>{product.description}</h6>
            <h6>{product.shipping ? "Shipping : yes" : "Shipping : No"}</h6>
            <h6>
              <div className="d-flex flex-wrap mx-auto m-2">
                <p>amount : </p>
                <button
                  className="btn btn-secondary btn-sm m-1"
                  disabled={product.amount <= 1 ? true : false}
                  onClick={() => {
                    decreaseCartItem(product);
                  }}
                >
                  -
                </button>
                <div className=" p-2 text-center" style={{ width: "30px" }}>
                  {product.amount}
                </div>
                <button
                  className="btn btn-secondary btn-sm m-1"
                  disabled={leftStock(product) < 1 ? true : false}
                  onClick={() => {
                    increaseCartItem(product);
                  }}
                >
                  +
                </button>
              </div>
            </h6>
            <h6>in stock : {leftStock(product)}</h6>
            <div className="d-flex flex-wrap mx-auto mt-2">
              <button
                className="btn btn-danger m-1"
                style={{ width: "100px", height: "40px" }}
                onClick={(e) => {
                  addToCart(product);
                  navigate("/cart");
                }}
              >
                buy now
              </button>
              <button
                className="btn btn-norm m-1"
                style={{ width: "100px", height: "40px" }}
                onClick={(e) => addToCart(product)}
              >
                +cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container row mx-auto p-5">
        <h3 className="display-5 text-center">Similar Products</h3>
        <>
          <div className="mb-2 text-center flex-wrap d-flex justify-content-center">
            {similar.length > 0
              ? similar.map((item) => (
                  <div key={item._id} className="card  img-card m-2 d-flex ">
                    <Link
                      to={`/product-details/${item._id}`}
                      className="product-link"
                    >
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
                          src={`/api/v1/product/product-photo/${item._id}`}
                          className="card-img-top c-p-img"
                          alt={item.name}
                        />
                      </div>
                      <h5 className="card-title  mt-4">
                        {item.name.substring(0, 16)}...
                      </h5>
                      <h5 className="card-title">{item.price}$</h5>
                      <p className="card-text">
                        {item.description.substring(0, 25)}...
                      </p>
                    </Link>
                    <div className="d-flex flex-wrap mx-auto m-2">
                      <button
                        className="btn btn-danger m-1"
                        style={{ width: "100px", height: "40px" }}
                        onClick={(e) => {
                          addToCart(item);
                          navigate("/cart");
                        }}
                      >
                        buy now
                      </button>
                      <button
                        className="btn btn-norm m-1"
                        style={{ width: "100px", height: "40px" }}
                        onClick={(e) => addToCart(item)}
                      >
                        +cart
                      </button>
                    </div>
                  </div>
                ))
              : "No related Products"}
          </div>
        </>
      </div>
    </Wrapper>
  );
};

export default ProductDetails;
