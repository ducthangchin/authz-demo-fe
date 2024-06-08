import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import { message } from "antd";
import { UserCreateRequest, UserDetails } from "@/models/user";

export interface UseCreateUserProps {
  onError?: () => void;
  onSuccess?: (data: UserDetails) => void;
}

const useCreateUser = (props?: UseCreateUserProps) => {
  const [loading, setLoading] = useState(false);

  const createUser = (data: UserCreateRequest) => {
    setLoading(true);
    return axiosInstance
      .post("/user/auth/register", data)
      .finally(() => {
        setLoading(false);
      })
      .then((res) => {
        const data: UserDetails = res.data;
        message.success("Tạo người dùng thành công");
        props?.onSuccess && props.onSuccess(data);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          message.error("Dữ liệu không hợp lệ");
        } else if (err.response?.status === 401) {
          message.error("Không có quyền truy cập");
        }
        message.error("Tạo người dùng thất bại");
        props?.onError && props.onError();
      });
  };

  return { createUser, loading };
};

export default useCreateUser;
