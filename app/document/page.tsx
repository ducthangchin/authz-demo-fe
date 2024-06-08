"use client";
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import useGetAllDocuments from "@/hooks/document/useGetAllDocuments";
import useGetDocumentColumn from "@/hooks/document/useGetDocumentColumn";
import { Button, Modal, Row, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import DocumentCreateForm from "@/components/DocumentCreateForm";
import useDeleteDocument from "@/hooks/document/useDeleteDocument";
import DocumentDetailForm from "@/components/DocumentDetailForm";

const page = () => {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
  const [documentId, setDocumentId] = useState<number>();

  const { loading, documents, getAllDocuments } = useGetAllDocuments();
  const { deleteDocument } = useDeleteDocument({
    onSuccess: getAllDocuments,
  });
  const { columns } = useGetDocumentColumn({
    onDelete: deleteDocument,
    onDetail: (id) => {
      setDocumentId(id);
      setIsOpenDetailForm(true);
    },
  });

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <Layout>
      <h1>Document</h1>
      <Row className="mb-1" justify={"end"}>
        <Space>
          <Button
            onClick={getAllDocuments}
            disabled={loading}
            icon={<ReloadOutlined />}
            type={"primary"}
          >
            Tải lại
          </Button>
          <Button
            onClick={() => {
              setIsOpenCreateForm(true);
            }}
            icon={<PlusOutlined />}
            type="primary"
          >
            Tạo mới
          </Button>
        </Space>
      </Row>
      <Table
        dataSource={documents}
        bordered={true}
        loading={loading}
        size={"middle"}
      >
        {columns.map((column) => (
          <Column {...column} key={column.key} children={null} />
        ))}
      </Table>

      <Modal
        title="Tạo mới tài liệu"
        open={isOpenCreateForm}
        onOk={() => {}}
        onCancel={() => {
          setIsOpenCreateForm(false);
        }}
        centered={true}
        width={"50%"}
        footer={false}
      >
        <DocumentCreateForm
          onClose={() => setIsOpenCreateForm(false)}
          onSuccess={getAllDocuments}
        />
      </Modal>
      <Modal
        title="Tài liệu"
        open={isOpenDetailForm}
        onOk={() => {}}
        onCancel={() => {
          setIsOpenDetailForm(false);
        }}
        centered={true}
        width={"50%"}
        footer={false}
      >
        <DocumentDetailForm
          onClose={() => setIsOpenDetailForm(false)}
          onSuccess={getAllDocuments}
          id={documentId}
        />
      </Modal>
    </Layout>
  );
};

export default page;
