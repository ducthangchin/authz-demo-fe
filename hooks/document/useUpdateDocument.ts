import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import { CreateDocumentRequest } from "@/models/document";
import { message } from "antd";

export interface UseUpdateDocumentProps {
  onError?: () => void;
  onSuccess?: (data: Document) => void;
}

const useUpdateDocument = (props?: UseUpdateDocumentProps) => {
  const [loading, setLoading] = useState(false);

  const updateDocument = (id: number, data: CreateDocumentRequest) => {
    setLoading(true);
    return axiosInstance
      .put(`/document/${id}`, data)
      .finally(() => {
        setLoading(false);
      })
      .then((res) => {
        const data: Document = res.data;
        message.success("Lưu thay đổi thành công");
        props?.onSuccess && props.onSuccess(data);
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          message.error("Dữ liệu không hợp lệ");
        } else if (err.response?.status === 401) {
          message.error("Không có quyền truy cập");
        }
        message.error("Lưu tài liệu thất bại");
        props?.onError && props.onError();
      });
  };

  return { updateDocument, loading };
};

export default useUpdateDocument;
