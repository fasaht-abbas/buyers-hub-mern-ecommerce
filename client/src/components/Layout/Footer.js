import React from "react";
import "./Layout.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className=" footer bg-dark text-light p-3">
      <h4 className="text-center">copyright &copy; buyershub.com</h4>
      <div className=" footer-Links text-center mt-3">
        <Link className="footer-Link " to="/contact">
          Contact
        </Link>
        |
        <Link className="footer-Link " to="/policy">
          Policy
        </Link>
        |
        <Link className="footer-Link " to="/about">
          About
        </Link>
      </div>
    </div>
  );
};

export default Footer;
