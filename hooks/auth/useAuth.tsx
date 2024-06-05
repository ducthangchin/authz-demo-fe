import React, { useState } from "react";
import { AuthResponse, LoginRequest } from "@/models/auth";
import axiosInstance from "@/lib/axios";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = (data: LoginRequest) => {
    setLoading(true);
    return axiosInstance
      .post("/user/auth/login", data)
      .finally(() => {
        setLoading(false);
      })
      .then((res) => {
        const data: AuthResponse = res.data;
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      });
  };

  return { login, loading };
};

export default useAuth;
