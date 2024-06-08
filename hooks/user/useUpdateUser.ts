import axiosInstance from "@/lib/axios";
import { UserProfile, UserUpdateRequest } from "@/models/user";
import { message } from "antd";
import { useState } from "react";

export interface UseUpdateUserProps {
  onSuccess?: (data: UserProfile) => void;
  onError?: () => void;
}

const useUpdateUser = (props?: UseUpdateUserProps) => {
  const [loading, setLoading] = useState(false);

  const updateUser = (id: number, data: UserUpdateRequest) => {
    setLoading(true);
    return axiosInstance
      .put(`/user/profile/${id}`, data)
      .finally(() => {
        setLoading(false);
      })
      .then((res) => {
        const data: UserProfile = res.data;
        message.success("Lưu thay đổi thành công");
        props?.onSuccess && props.onSuccess(data);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          message.error("Dữ liệu không hợp lệ");
        } else if (err.response?.status === 401) {
          message.error("Không có quyền truy cập");
        }
        message.error("Lưu thay đổi thất bại");
        props?.onError && props.onError();
      });
  };

  return { updateUser, loading };
};

export default useUpdateUser;
