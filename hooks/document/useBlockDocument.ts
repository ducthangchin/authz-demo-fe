import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import { message } from "antd";

export interface UseBlockDocumentProps {
  onError?: () => void;
  onSuccess?: () => void;
}

const useBlockDocument = (props?: UseBlockDocumentProps) => {
  const [loading, setLoading] = useState(false);

  const blockDocument = (id: number, blocked: boolean) => {
    setLoading(true);
    return axiosInstance
      .put(`/document/${id}/block`, blocked)
      .finally(() => {
        setLoading(false);
      })
      .then((res) => {
        const data: Document = res.data;
        message.success("Lưu thay đổi thành công");
        props?.onSuccess && props.onSuccess();
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

  return { blockDocument, loading };
};

export default useBlockDocument;
