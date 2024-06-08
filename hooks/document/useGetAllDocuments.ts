import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import { message } from "antd";

const useGetAllDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  const getAllDocuments = async () => {
    setLoading(true);
    
    axiosInstance
      .get("/document")
      .then((res) => {
        setDocuments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          message.error("Dữ liệu không hợp lệ");
        } else if (err.response?.status === 401) {
          message.error("Không có quyền truy cập");
        }
        console.log(err);
        setLoading(false);
      });
  };

  return { loading, documents, getAllDocuments };
};

export default useGetAllDocuments;
