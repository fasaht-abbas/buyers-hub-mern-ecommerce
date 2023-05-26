import React, { useState } from "react";
import Wrapper from "../../../components/Layout/Wrapper";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePassword = () => {
  const [token, setToken] = useState();
  const [newPassword, setNewPassword] = useState();
  const navigate = useNavigate();

  const UpdateHandler = async (e) => {
    e.preventDefault();
    const res = await axios.put("/api/v1/auth/update-password", {
      token,
      newPassword,
    });
    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/login");
    }
  };
  return (
    <Wrapper>
      <form onSubmit={UpdateHandler} className="form ">
        <div className="form-border text-norm">
          <h1 className="text-center">ForgotPassword</h1>

          <div className="mb-3">
            <input
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter Reset OTP"
              type="String"
              className="form-control"
              id="exampleInputToken1"
              aria-describedby="tokenHelp"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new Password"
              type="String"
              className="form-control"
              id="exampleInputNewPassword1"
              aria-describedby="newPasswordHelp"
              required
            />
          </div>
          <button type="submit" className="btn btn-norm">
            Reset Now
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UpdatePassword;
