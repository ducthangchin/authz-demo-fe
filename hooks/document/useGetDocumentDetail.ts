import React, { useState } from "react";
import axiosInstance from "@/lib/axios";
import { Document } from "@/models/document";

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
        console.log(err);
        setLoading(false);
      });
  };

  return { loading, document, getDocumentDetail };
};

export default useGetDocumentDetail;
