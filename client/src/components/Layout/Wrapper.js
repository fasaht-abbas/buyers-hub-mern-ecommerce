import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";

const Wrapper = ({ children, title, description, keywords, auther }) => {
  return (
    <div className="wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={auther}></meta>
      </Helmet>
      <Header />
      <main style={{ minHeight: "100vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Wrapper;
