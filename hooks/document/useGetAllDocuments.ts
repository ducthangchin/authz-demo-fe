import React, { useState } from "react";
import axiosInstance from "@/lib/axios";

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
        console.log(err);
        setLoading(false);
      });
  };

  return { loading, documents, getAllDocuments };
};

export default useGetAllDocuments;
