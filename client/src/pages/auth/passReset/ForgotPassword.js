import React, { useState } from "react";
import Wrapper from "../../../components/Layout/Wrapper";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../Auth.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // eslint-disable-next-line
  const navigate = useNavigate();

  const ForgotHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/update-password");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Wrapper>
      <form onSubmit={ForgotHandler} className="form">
        <div className="form-border">
          <h1>ForgotPassword</h1>

          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-norm">
              Next
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default ForgotPassword;
