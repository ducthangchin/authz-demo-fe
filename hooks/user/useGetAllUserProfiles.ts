import axiosInstance from "@/lib/axios";
import { UserProfile } from "@/models/user";
import { message } from "antd";
import { useState } from "react";

const useGetAllUserProfiles = () => {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);

  const getUserProfiles = () => {
    setLoading(true);
    axiosInstance
      .get("/user/profile")
      .then((res) => {
        const data: UserProfile[] = res.data;
        setProfiles(data);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          message.error("Dữ liệu không hợp lệ");
        } else if (err.response?.status === 401) {
          message.error("Không có quyền truy cập danh sách người dùng");
        }
      })
      .finally(() => setLoading(false));
  };

  return { loading, profiles, getUserProfiles };
};

export default useGetAllUserProfiles;
