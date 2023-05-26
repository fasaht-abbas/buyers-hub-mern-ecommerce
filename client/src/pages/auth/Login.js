import "./Auth.css";
import React, { useState } from "react";
import Wrapper from "../../components/Layout/Wrapper";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // on submit handler function
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        {
          res.data.user.role === 1
            ? navigate("/dashboard/admin")
            : navigate(location.state || "/");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("please recheck your password and id");
      console.log(error);
    }
  };

  const ForgotPasswordHandler = () => {
    navigate("/forgot-password");
  };

  return (
    <Wrapper title="Login- Buyers HUB">
      <form onSubmit={loginHandler} className="form">
        <div className="form-border">
          <h1 className="text-heading">Login Now</h1>

          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              type="email"
              className="form-control input-text text-norm"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="form-control input-text text-norm"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              onClick={ForgotPasswordHandler}
              className="btn text-norm"
            >
              Forgot Password?
            </button>
          </div>
          <button type="submit" className="btn btn-norm text-norm b5">
            Login
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Login;
