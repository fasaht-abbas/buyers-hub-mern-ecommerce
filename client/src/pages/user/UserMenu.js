import React from "react";
import { NavLink, Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="list-group list-group-flush pb-2 tex-norm">
        <Link to="/dashboard/user" className="user-link">
          <h5 className="text-center mt-4 mb-2 lead">User Dashboard</h5>
        </Link>
        <NavLink
          to="/dashboard/user/profile-settings"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          User Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
      </div>
    </>
  );
};

export default UserMenu;
