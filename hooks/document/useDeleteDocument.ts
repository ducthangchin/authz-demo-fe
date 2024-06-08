import React from "react";
import axiosInstance from "@/lib/axios";
import { message } from "antd";

export interface UseDeleteDocumentProps {
  onError?: () => void;
  onSuccess?: () => void;
}

const useDeleteDocument = (props?: UseDeleteDocumentProps) => {
  const [loading, setLoading] = React.useState(false);

  const deleteDocument = async (id: number) => {
    setLoading(true);

    return axiosInstance
      .delete(`/document/${id}`)
      .finally(() => {
        setLoading(false);
      })
      .then(() => {
        message.success("Xóa tài liệu thành công");
        props?.onSuccess && props.onSuccess();
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          message.error("Dữ liệu không hợp lệ");
        } else if (err.response?.status === 401) {
          message.error("Không có quyền truy cập");
        }
        props?.onError && props.onError();
      });
  };

  return { loading, deleteDocument };
};

export default useDeleteDocument;
