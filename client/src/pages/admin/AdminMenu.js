import React from "react";
import { NavLink, Link } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="list-group list-group-flush pb-2 text-norm ">
        <Link to="/dashboard/admin" className="nav-link admin-link">
          <h5 className="text-center mt-4 mb-2 lead">Admin Dashboard</h5>
        </Link>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/admin/all-products"
          className="list-group-item list-group-item-action"
        >
          All Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          Admin Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/admin-settings"
          className="list-group-item list-group-item-action"
        >
          Admin Settings
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
