import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Wrapper from "../components/Layout/Wrapper";
import { Checkbox, Radio } from "antd";
import { ranges } from "../components/Forms/Utils";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/auth";
import Loading from "../components/Loading";
import { Modal } from "antd";
import SearchBar from "../components/Forms/SearchBar";

const HomePage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [productCount, setProductCount] = useState("");
  const [pageSize, setPageSize] = useState(6);
  const navigate = useNavigate();
  const [catLoading, setCatLoading] = useState(false);
  const [proLoading, setProLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  // filter pagination
  const [filterProductCount, setFilterProductCount] = useState("");
  const [filterpageSize, setFilterPageSize] = useState(6);
  const [currentFilterPage, setCurrentFilterPage] = useState(1);
  const [fiterPageCount, setFilterPageCount] = useState("");

  const AdminCheck = async () => {
    if (auth?.user?.role === 1) {
      navigate("/dashboard/admin");
    }
  };

  const scroll = async () => {
    window.scrollTo({
      top: 400,
    });
  };

  // handle the filter OR checking filter categories box
  const handleFilter = (value, id) => {
    scroll();
    let all = [...checked];
    if (value) {
      all.push(id);
    } else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  // calling the filterd products api

  const filterdProducts = async () => {
    setProLoading(true);
    try {
      const { data } = await axios.post("/api/v1/product/filtered-products", {
        checked,
        radio,
        currentFilterPage,
      });
      if (data.success) {
        setFilterPageCount(data?.fpc);
        setFilterProductCount(data?.filterProductCount);
        setFilterPageSize(data?.filterPageSize);
        setProducts(data?.filtered);
        setProLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useeffect for the pagination of filterd products.......on changing the page
  useEffect(() => {
    filterdProducts();
  }, [currentFilterPage]);

  // paginating the filtered products--btn
  const filterPrev = () => {
    scroll();
    if (currentFilterPage === 1) {
      return currentFilterPage;
    } else {
      return setCurrentFilterPage(currentFilterPage - 1);
    }
  };
  // paginating the filtered products--btn
  const filterNext = () => {
    scroll();
    if (currentFilterPage === fiterPageCount) {
      return currentFilterPage;
    } else {
      return setCurrentFilterPage(currentFilterPage + 1);
    }
  };

  // simple fetching the filterd products
  useEffect(() => {
    if (radio.length || checked.length) filterdProducts();
  }, [checked, radio]);

  /////////////////////////////////////// GETTING ALL THE CATEGORIES
  const getAllCategories = async () => {
    setCatLoading(true);
    try {
      const { data } = await axios.get("/api/v1/category/all-categories");
      if (data?.success) {
        setCategories(data.allCategories);
        setCatLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // PAGINATION  along with getting all the products

  const productPagination = async () => {
    setProLoading(true);
    try {
      const { data } = await axios.post("/api/v1/product/product-pagination", {
        currentPage,
      });
      if (data.success) {
        setPageCount(data?.pageCount);
        setProductCount(data?.productCount);
        setPageSize(data?.pageSize);
        setProducts(data?.pageItems);
        setProLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   Simple pagenation useeffect......
  useEffect(() => {
    productPagination();
  }, [currentPage]);

  //  useeffect that takes place when the filters are removed
  useEffect(() => {
    if (!checked.length && !radio.length) productPagination();
  }, [checked.length, radio.length]);

  // all products pagination btns
  const handlePrev = () => {
    scroll();
    if (currentPage === 1) return currentPage;
    return setCurrentPage(currentPage - 1);
  };
  // all products pagination btns
  const handleNext = () => {
    scroll();
    if (currentPage === pageCount) return currentPage;
    return setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    AdminCheck();
  }, [productPagination, handleFilter]);

  const addToCart = (p) => {
    console.log(p.amount, p.quantity);
    let myCart = [...cart];
    const some = myCart.some((s) => s._id === p._id);
    if (!some) {
      setCart([...cart, { ...p, amount: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...p, amount: 1 }])
      );
      toast.success(`${p.name} added to cart`);
    } else {
      let newCart = cart.map((i) => {
        if (p._id === i._id) {
          if (i.amount < i.quantity) {
            i = { ...i, amount: i.amount + 1 };
            toast.success(`${p.name} added again`);
          } else {
            return toast.error("out of stock");
          }
        }
        return i;
      });
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  return (
    <Wrapper title="HomePage- Buyers Hub">
      <>
        <div className="row home-top-bg justify-content-center text-norm mb-4">
          <div className="col-md-12">
            <div
              style={{ height: "50vh" }}
              className="d-flex justify-content-center bg-black-pic"
            >
              <div className="align-self-center text-center">
                <h1
                  className="display-4 text-heading text-center"
                  style={{ color: "orange" }}
                >
                  Welcome to Buyers Hub
                </h1>
                <p className="bh-caption lead text-center text-norm">
                  The Leading Online shopping platform
                </p>
                <div className="search col-md-12  d-none">
                  <div className="mx-auto m-3 mb-0">
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="filters col-md-2 m-2">
            <div className="mb-2 " style={{ marginTop: "80px" }}>
              <h6 className="m-1 lead text-normal">Category Filter</h6>
              <div className="mb-2 d-flex flex-column ml-0">
                {!catLoading ? (
                  categories.map((c) => (
                    <Checkbox
                      className="m-1"
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      key={c._id}
                    >
                      {c.name}
                    </Checkbox>
                  ))
                ) : (
                  <Loading height={"20vh"} />
                )}
              </div>
              <hr />
              <h6 className="m-1 lead text-norm">Price Filter</h6>
              <div className="mb-2 d-flex flex-column ">
                <Radio.Group
                  onChange={(e) => setRadio(e.target.value)}
                  className="secondary"
                >
                  {ranges.map((r) => (
                    <div key={r._id}>
                      <Radio value={r.arr} className="m-1 text-norm ant-radio">
                        {r.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="mb-2">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setChecked([]);
                    setRadio([]);
                    window.location.reload();
                  }}
                >
                  Reset Fiters
                </button>
              </div>
            </div>
          </div>
          <div className=" m-2 col-md-9 ">
            <div className="mb-2">
              <p className="text-center display-5 text-norm">Top Products</p>
            </div>
            <div className="filter-btn mb-2  justify-content-center d-none">
              <button
                onClick={() => setFilterVisible(true)}
                className=" btn btn-outline-secondary"
              >
                <i className="bi bi-filter">filters</i>
              </button>
            </div>
            <div className="mb-2 text-center  d-flex justify-content-center flex-wrap ">
              {!proLoading ? (
                products.map((p) => (
                  <div
                    key={p._id}
                    className="  card img-card  m-2 d-flex justify-content-center"
                  >
                    <Link
                      to={`/product-details/${p._id}`}
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
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top c-p-img"
                          alt={p.name}
                        />
                      </div>
                      <h5 className="card-title  mt-4">
                        {p.name.substring(0, 16)}...
                      </h5>
                      <h5 className="card-title">{p.price}$</h5>
                      <p className="card-text">
                        {p.description.substring(0, 25)}...
                      </p>
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
                ))
              ) : (
                <Loading height={"60vh"} />
              )}
            </div>
            {!checked.length && !radio.length ? (
              productCount > pageSize ? (
                <div className="pages d-flex justify-content-center">
                  <button
                    type="button"
                    onClick={handlePrev}
                    style={{ width: "70px", height: "40px" }}
                    className="btn  btn-secondary"
                  >
                    prev
                  </button>
                  <div className="mb-2 m-1 p-1">
                    <h5>{currentPage}</h5>
                  </div>
                  <button
                    type="button"
                    style={{ width: "70px", height: "40px" }}
                    onClick={handleNext}
                    className="btn btn-secondary"
                  >
                    next
                  </button>
                </div>
              ) : (
                ""
              )
            ) : filterProductCount > filterpageSize ? (
              <div className="mb3 pages d-flex justify-content-center">
                <button
                  type="button"
                  style={{ width: "70px", height: "40px" }}
                  className="btn btn-secondary"
                  onClick={filterPrev}
                >
                  prev
                </button>
                <div className="mb-2 m-1 p-1">
                  <p>{currentFilterPage}</p>
                </div>
                <button
                  type="button"
                  style={{ width: "70px", height: "40px" }}
                  className="btn btn-secondary"
                  onClick={filterNext}
                >
                  next
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <Modal
            open={filterVisible}
            footer={null}
            onCancel={() => setFilterVisible(false)}
          >
            <div className="mb-2 " style={{ marginTop: "30px" }}>
              <h6 className="m-1 lead text-normal">Category Filter</h6>
              <div className="mb-2 d-flex flex-column ml-0">
                {!catLoading ? (
                  categories.map((c) => (
                    <Checkbox
                      className="m-1"
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      key={c._id}
                    >
                      {c.name}
                    </Checkbox>
                  ))
                ) : (
                  <Loading height={"20vh"} />
                )}
              </div>
              <hr />
              <h6 className="m-1 lead text-norm">Price Filter</h6>
              <div className="mb-2 d-flex flex-column ">
                <Radio.Group
                  onChange={(e) => setRadio(e.target.value)}
                  className="secondary"
                >
                  {ranges.map((r) => (
                    <div key={r._id}>
                      <Radio value={r.arr} className="m-1 text-norm ant-radio">
                        {r.name}
                      </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="mb-2 d-flex justify-content-center">
                <button
                  className="btn m-2 btn-danger"
                  onClick={() => {
                    setChecked([]);
                    setRadio([]);
                    window.location.reload();
                  }}
                >
                  Reset Fiters
                </button>
                <button
                  className="btn m-2 btn-norm"
                  onClick={() => {
                    setFilterVisible(false);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </>
    </Wrapper>
  );
};

export default HomePage;
