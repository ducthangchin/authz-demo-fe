import axiosInstance from "@/lib/axios";
import { UserProfile } from "@/models/user";
import { message } from "antd";
import { useState } from "react";

const useGetProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>();

  const getProfile = (id: number) => {
    setLoading(true);
    axiosInstance
      .get(`/user/profile/${id}`)
      .then((res) => {
        const data: UserProfile = res.data;
        setProfile(data);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          message.error("Dữ liệu không hợp lệ");
        } else if (err.response?.status === 401) {
          message.error("Không có quyền truy cập thông tin người dùng");
        }
      })
      .finally(() => setLoading(false));
  };

  return { loading, profile, getProfile };
};

export default useGetProfile;
