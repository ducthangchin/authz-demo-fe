import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input, Row, Space, Spin, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SyncOutlined, SaveOutlined } from "@ant-design/icons";
import useGetDocumentDetail from "@/hooks/document/useGetDocumentDetail";
import useUpdateDocument from "@/hooks/document/useUpdateDocument";

export interface DocumentDetailFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
  id?: number;
}

const DocumentDetailForm = (props: DocumentDetailFormProps) => {
  const { id, onSuccess, onClose } = props;

  const [form] = Form.useForm();

  const { loading, document, getDocumentDetail } = useGetDocumentDetail();
  const { loading: isUpdating, updateDocument } = useUpdateDocument();

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    id && getDocumentDetail(id);
  }, [id]);

  useEffect(() => {
    resetForm();
  }, [document]);

  const resetForm = useCallback(() => {
    form.setFieldValue("name", document?.name);
    form.setFieldValue("content", document?.content);
    setIsEdited(false);
  }, [document]);

  const onFormChange = useCallback(() => {
    const isFormEdited =
      form.getFieldValue("name") != document?.name ||
      form.getFieldValue("content") != document?.content;
    setIsEdited(isFormEdited);
  }, [form, document]);

  const closeForm = () => {
    props.onClose && props.onClose();
  };

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        id &&
          updateDocument(id, values).then(() => {
            onSuccess && onSuccess();
            closeForm();
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Spin spinning={loading}>
      <Row justify={"end"}>
        <Button
          onClick={() => {
            id && getDocumentDetail(id);
          }}
          icon={<SyncOutlined />}
        ></Button>
      </Row>
      <Form
        name="detail-form"
        layout="vertical"
        form={form}
        onChange={onFormChange}
      >
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
          <TextArea autoSize={{ minRows: 20, maxRows: 20 }} />
        </Form.Item>
      </Form>
      <Row justify={"end"}>
        <Space>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={submitForm}
            disabled={!isEdited}
          >
            Lưu thay đổi
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

export default DocumentDetailForm;
