import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Layout/Wrapper";
import { useAuth } from "../../context/auth";
import { apiClient } from "../../utils/AxiosInterceptor";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-profile`,
        { name, phone, address, email, password }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data?.updated });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updated;
        localStorage.setItem("auth", JSON.stringify(ls));
        navigate("/dashboard/user");
        toast.success("user Profile Updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("wrong password");
    }
  };

  useEffect(() => {
    setName(auth.user.name);
    setPhone(auth.user.phone);
    setAddress(auth.user.address);
    setEmail(auth.user.email);
  }, [auth.user]);
  return (
    <Wrapper title="Profile-Settings Buyers Hub">
      <div className="container-fluid align-items-center mt-4 mb-4 text-norm">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <UserMenu />
          </div>
          <div className=" col-md-8 m-2 mb-4 p-4">
            <h1 className="text-center mb-4 mt-2 display-5">
              Profile Settings
            </h1>
            <form onSubmit={updateProfile} className="">
              <div className="">
                <div className="mb-3">
                  <th className="lead">Name</th>
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
                  <th className="lead">Email</th>
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
                  <th className="lead">Phone</th>
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
                  <th className="lead">Enter Password</th>
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
                  <th className="lead">Address</th>
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

export default ProfileSettings;
