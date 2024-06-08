import React from "react";
import { Button, Space } from "antd";
import type { TableProps } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { Document } from "@/models/document";

export interface DocumentColumnsProps {
  onDetail?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const useGetDocumentColumn = (props?: DocumentColumnsProps) => {
  const columns: TableProps<Document>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên tài liệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Người tạo",
      dataIndex: "createdByUsername",
      key: "createdByUsername",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: Date) => (
        <p>{moment(createdAt).format("DD/MM/YYYY HH:ss")}</p>
      ),
      align: "right",
    },
    {
      title: "Lần cuối chỉnh sửa",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: Date) => (
        <p>{moment(updatedAt).format("DD/MM/YYYY HH:ss")}</p>
      ),
      align: "right",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              props?.onDetail && props.onDetail(record.id);
            }}
            icon={<EyeOutlined />}
          >
            Xem
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              props?.onDelete && props.onDelete(record.id);
            }}
            icon={<DeleteOutlined />}
          >
            Xóa
          </Button>
        </Space>
      ),
      align: "right",
    },
  ];

  return { columns };
};

export default useGetDocumentColumn;
