import React from "react";
import Wrapper from "../../components/Layout/Wrapper";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/auth";

const UserDashboard = () => {
  const [auth] = useAuth();

  return (
    <Wrapper title="User- Dashboard - Buyers Hub ">
      <div className="container-fluid align-items-center mt-4 mb-4 text-norm">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <UserMenu />
          </div>
          <div className=" col-md-8 m-2 mb-4 p-4  ">
            <h1 className="text-center mb-4 mt-2 display-5">User Info</h1>
            <div className="row justify-content-center">
              <div className="col-10">
                <table className="table table-responsive">
                  <tbody>
                    <tr>
                      <th>User Name</th>
                      <td align="right">{auth.user.name}</td>
                    </tr>
                    <tr>
                      <th>User Email</th>
                      <td align="right">{auth.user.email}</td>
                    </tr>
                    <tr>
                      <th>User Phone</th>
                      <td align="right">{auth.user.phone}</td>
                    </tr>
                    <tr>
                      <th>User Address</th>
                      <td align="right">{auth.user.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserDashboard;
