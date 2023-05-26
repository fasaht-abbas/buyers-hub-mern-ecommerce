import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./components/Routes/Private";
import UpdatePassword from "./pages/auth/passReset/UpdatePassword";
import ForgotPassword from "./pages/auth/passReset/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoutes from "./components/Routes/AdminRoutes";
import UserDashboard from "./pages/user/UserDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import AllProducts from "./pages/admin/AllProducts";
import AllUsers from "./pages/admin/AllUsers";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import ProfileSettings from "./pages/user/ProfileSettings";
import UserOrders from "./pages/user/UserOrders";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSettings from "./pages/admin/AdminSettings";

const App = () => {
  return (
    <>
      <Routes>
        {/* PRIVATE ROUTES User|| REquire user Login */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile-settings" element={<ProfileSettings />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>
        {/* PRIVATE ROUTES ADMIN|| REquire admin Login */}
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/users" element={<AllUsers />} />
          <Route path="admin/admin-settings" element={<AdminSettings />} />
          <Route path="admin/all-products" element={<AllProducts />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/update-product/:id" element={<UpdateProduct />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

export default App;
