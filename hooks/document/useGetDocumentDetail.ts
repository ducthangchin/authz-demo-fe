import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import { Document } from "@/models/document";
import { message } from "antd";

const useGetDocumentDetail = () => {
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState<Document>();

  const getDocumentDetail = async (id: number) => {
    setLoading(true);

    axiosInstance
      .get(`/document/${id}`)
      .then((res) => {
        setDocument(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          message.error("Dữ liệu không hợp lệ");
        } else if (err.response?.status === 401) {
          message.error("Không có quyền truy cập");
        }
        setDocument(undefined)
        console.log(err);
        setLoading(false);
      });
  };

  return { loading, document, getDocumentDetail };
};

export default useGetDocumentDetail;
