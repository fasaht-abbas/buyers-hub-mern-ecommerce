import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Layout/Wrapper";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // api call for getting all the users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-users`
      );
      setUsers(data?.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Wrapper title="All Users- Dashboard - Buyers Hub ">
      <div className="container-fluid align-items-center mt-4 text-norm mb-4">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <AdminMenu />
          </div>
          <div className=" col-md-8 m-2 mb-4 p-4  ">
            <h1 className="text-center mb-4 mt-2 display-5">All Users</h1>

            <div className=" text-norm">
              <table className="table ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                {users.map((u, i) => (
                  <tbody>
                    <tr>
                      <th scope="col">{i + 1}</th>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.address}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AllUsers;
