import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import { CreateDocumentRequest } from "@/models/document";
import { message } from "antd";

export interface UseCreateDocumentProps {
  onError?: () => void;
  onSuccess?: (data: Document) => void;
}

const useCreateDocument = (props?: UseCreateDocumentProps) => {
  const [loading, setLoading] = useState(false);

  const createDocument = (data: CreateDocumentRequest) => {
    setLoading(true);
    return axiosInstance
      .post("/document", data)
      .finally(() => {
        setLoading(false);
      })
      .then((res) => {
        const data: Document = res.data;
        message.success("Tạo tài liệu thành công");
        props?.onSuccess && props.onSuccess(data);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          message.error("Dữ liệu không hợp lệ");
        } else if (err.response?.status === 401) {
          message.error("Không có quyền truy cập");
        }
        message.error("Tạo tài liệu thất bại");
        props?.onError && props.onError();
      });
  };

  return { createDocument, loading };
};

export default useCreateDocument;
