import React, { useEffect } from "react";
import { Button, Form, Input, Row, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SyncOutlined, SaveOutlined } from "@ant-design/icons";
import useCreateDocument from "@/hooks/document/useCreateDocument";

export interface DocumentCreateFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

const DocumentCreateForm = (props: DocumentCreateFormProps) => {
  const [form] = Form.useForm();
  const { loading, createDocument } = useCreateDocument({
    onSuccess: () => {
      closeForm();
      props.onSuccess && props.onSuccess();
    },
  });

  const resetForm = () => {
    form.resetFields();
  };

  const closeForm = () => {
    props.onClose && props.onClose();
  };

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        createDocument(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Spin spinning={loading}>
      <Row justify={"end"}>
        <Button onClick={resetForm} icon={<SyncOutlined />}></Button>
      </Row>
      <Form name="layout-multiple-horizontal" layout="vertical" form={form}>
        <Form.Item
          label="Tên tài liệu"
          name="name"
          rules={[
            { required: true, message: "Tên tài liệu không được bỏ trống" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: "Nội dung không được bỏ trống" }]}
        >
          <TextArea autoSize={{ minRows: 20, maxRows:20 }} />
        </Form.Item>
      </Form>
      <Row justify={"end"}>
        <Space>
          <Button type="primary" icon={<SaveOutlined />} onClick={submitForm}>
            Lưu
          </Button>
          <Button
            danger
            type="primary"
            onClick={closeForm}
            icon={<SaveOutlined />}
          >
            Đóng
          </Button>
        </Space>
      </Row>
    </Spin>
  );
};

export default DocumentCreateForm;
