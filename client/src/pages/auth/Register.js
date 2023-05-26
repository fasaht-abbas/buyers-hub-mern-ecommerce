import React, { useState } from "react";
import Wrapper from "../../components/Layout/Wrapper";
import "./Auth.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // on submit handler function
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        phone,
        email,
        password,
        address,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Wrapper title=" Register-Buyers Hub">
      <form onSubmit={submitHandler} className="form">
        <div className="form-border m-5">
          <h1 className="text-heading">Register Now</h1>
          <div className="mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Full Name"
              type="text"
              className="form-control input-text text-norm"
              id="exampleInputName1"
              required
            />
          </div>
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
          <div className="mb-3 input-number">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Number"
              type="number"
              className="form-control input-text text-norm"
              id="exampleInputNumber1"
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
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              type="text"
              className="form-control  input-text text-norm"
              id="exampleInputAddress1"
              required
            />
          </div>

          <button type="submit" className="btn btn-norm text-norm">
            Register
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Register;
