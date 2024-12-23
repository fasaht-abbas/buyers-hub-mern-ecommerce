import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";

const Spinner = () => {
  const [count, setCount] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();
  const [auth] = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    if (count === 0) {
      auth?.token
        ? navigate("/") && toast.error("access not allowed")
        : navigate("/login", {
            state: location.pathname,
          });
    }
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h4 className="Text-center">
          UnAouthorized access....Redirecting in {count} seconds
        </h4>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
