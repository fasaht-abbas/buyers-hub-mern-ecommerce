import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Spinner from "../Spinner";
import { apiClient } from "../../utils/AxiosInterceptor";

export default function AdminRoutes() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await apiClient.get("/api/v1/auth/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    auth.token ? authCheck() : console.log("error in token");
  }, [auth.token]);
  return ok ? <Outlet /> : <Spinner />;
}
