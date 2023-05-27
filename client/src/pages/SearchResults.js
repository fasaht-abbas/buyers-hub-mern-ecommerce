import React from "react";
import Wrapper from "../components/Layout/Wrapper";
import { useSearch } from "../context/search";
import { useCart } from "../context/cartContext";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/Forms/SearchBar";

const SearchResults = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values] = useSearch();

  const addToCart = (p) => {
    let myCart = [...cart];
    const some = myCart.some((s) => s._id === p._id);

    if (!some) {
      setCart([...cart, { ...p, amount: p.amount }]);

      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...p, amount: 1 }])
      );
      toast.success(`${p.name} added to cart`);
    } else {
      const newCart = cart.map((i) => {
        if (p._id === i._id && i.amount < i.quantity) {
          i = { ...i, amount: i.amount + p.amount };
          toast.success(`${p.name} added again`);
        } else {
          toast.error("out of stock");
        }
        return i;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  return (
    <Wrapper title="Search results">
      <div className="container text-norm">
        <div className="search col-md-12  d-none justify-content-center">
          <div className="mx-auto m-3 mb-0">
            <SearchBar />
          </div>
        </div>
        <div className="text-center">
          <h1 className="display-5">Search Results</h1>
          {values.results.length > 0 ? (
            <h6 className="lead">{values.results.length} products found</h6>
          ) : (
            <p className="lead">no search results</p>
          )}
        </div>
        <div className="mb-2 text-center d-flex flex-wrap justify-content-center">
          {values.results.map((p) => (
            <div
              key={p._id}
              className="card img-card  m-2 d-flex justify-content-center"
            >
              <Link to={`/product-details/${p._id}`} className="product-link">
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
                    className="card-img-top c-p-img"
                    alt={p.name}
                  />
                </div>
                <h5 className="card-title mt-4">
                  {p.name.substring(0, 16)}...
                </h5>
                <h5 className="card-title">{p.price}$</h5>
                <p className="card-text">{p.description.substring(0, 25)}...</p>
              </Link>
              <div className="d-flex flex-wrap mx-auto m-2">
                <button
                  className="btn btn-danger m-1"
                  style={{ width: "100px", height: "40px" }}
                  onClick={(e) => {
                    addToCart(p);
                    navigate("/cart");
                  }}
                >
                  buy now
                </button>
                <button
                  className="btn btn-norm m-1"
                  style={{ width: "100px", height: "40px" }}
                  onClick={(e) => addToCart(p)}
                >
                  +cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchResults;
