import AdminMenu from "./AdminMenu";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Wrapper from "../../components/Layout/Wrapper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const AdminSettings = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const updateAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/v1/auth/update-admin", {
        name,
        phone,
        address,
        email,
        password,
      });
      if (res.data.success.false) {
        toast.error("Error in the profile update controller");
      } else {
        setAuth({ ...auth, user: res.data.updated });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = res.data.updated;
        localStorage.setItem("auth", JSON.stringify(ls));
        navigate("/dashboard/admin");
        toast.success("Admin Profile Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setName(auth.user.name);
    setPhone(auth.user.phone);
    setAddress(auth.user.address);
    setEmail(auth.user.email);
  }, [auth.user]);

  return (
    <Wrapper>
      <div className="container-fluid align-items-center mt-4 mb-4">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <AdminMenu />
          </div>
          <div className=" col-md-8 m-2 mb-4 p-4 text-norm ">
            <h1 className="text-center mb-4 mt-2 display-5">Admin Settings</h1>
            <form onSubmit={updateAdmin} className="">
              <div className="">
                <div className="mb-3">
                  <th className=".lead">Name</th>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Full Name"
                    type="text"
                    className="form-control input-text"
                    id="exampleInputName1"
                  />
                </div>
                <div className="mb-3">
                  <th className=".lead">Email</th>
                  <input
                    value={email}
                    disabled
                    placeholder="Email Address"
                    type="email"
                    className="form-control input-text"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="mb-3 input-number">
                  <th className=".lead">Phone</th>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Your Number"
                    type="number"
                    className="form-control input-text"
                    id="exampleInputNumber1"
                  />
                </div>
                <div className="mb-3">
                  <th className=".lead">Enter Password</th>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="form-control input-text"
                    id="exampleInputPassword1"
                  />
                </div>

                <div className="mb-3">
                  <th className=".lead">Address</th>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    type="text"
                    className="form-control input-text"
                    id="exampleInputAddress1"
                  />
                </div>
                <div className="d-grid justify-items-center mx-auto col-12">
                  <button type="submit" className="btn btn-update">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminSettings;
