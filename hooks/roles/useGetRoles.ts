import axiosInstance from "@/lib/axios";
import { Role } from "@/models/roles";
import React, { useState } from "react";

const useGetRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  const getRoles = () => {
    setLoading(true);
    axiosInstance
      .get("/user/roles")
      .then((res) => {
        setRoles(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  return { roles, loading, getRoles };
};

export default useGetRoles;
