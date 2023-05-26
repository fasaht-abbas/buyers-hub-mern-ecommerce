import React from "react";
import "./Layout.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchBar from "../Forms/SearchBar";
import { useCart } from "../../context/cartContext";
import { Badge } from "antd";
import mainLogo2 from "../../images/mainLogo2.svg";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    navigate("/login");
    localStorage.removeItem("auth");
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("__paypal_storage__");
    toast.success("logged out successfully");
  };
  return auth?.token && auth.user.role === 1 ? (
    <div className="header text-norm">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/dashboard/admin">
            <img src={mainLogo2} alt="BUYERS HUB" className="logo-img" />
          </Link>
          <>
            <ul className="navbar-nav ms-auto mb-2 justify-content-center mb-lg-0">
              <li className="nav-item admin-link dropdown active">
                <NavLink
                  className="link-dark dropdown-toggle"
                  role="button"
                  aria-current="page"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu active">
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      aria-current="page"
                      to="/login"
                      className=" dropdown-item"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </>
        </div>
      </nav>
    </div>
  ) : (
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex">
          <Link className="navbar-brand" to="/">
            <img src={mainLogo2} alt="BUYERS HUB" className="logo-img" />
          </Link>
          <div className="ml-auto search-bar">
            <SearchBar />
          </div>
          <button
            className="navbar-toggler ml-auto "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto  mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              {!auth.token ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown active">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <NavLink className="dropdown-item" to="/dashboard/user">
                        Dashboard
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        to="/login"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </div>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/cart">
                  {!cart.length ? (
                    <i className="bi bi-cart cart-icon"></i>
                  ) : (
                    <Badge count={cart?.length} showZero>
                      <i className="bi bi-cart cart-icon"></i>
                    </Badge>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
