"use client";
import useGetRoles from "@/hooks/roles/useGetRoles";
import useCreateUser from "@/hooks/user/useCreateUser";
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Select,
  SelectProps,
  Space,
} from "antd";
import React, { useEffect, useMemo } from "react";
import UserInfo from "../UserInfo";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const UserRegistrationForm = () => {
  const [form] = Form.useForm();

  const { roles, getRoles } = useGetRoles();

  const { loading, createUser } = useCreateUser({
    onSuccess(data) {
      Modal.success({
        content: <UserInfo user={data} />,
        title: "Thông tin",
        onClose: () => form.resetFields(),
      });
    },
  });

  const options: SelectProps["options"] = useMemo(
    () =>
      roles.map((role) => ({
        label: role.roleName,
        value: role.id,
      })),
    [roles],
  );

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  const resetFormFields = () => {
    form.resetFields();
  };

  const handleCreateUser = () => {
    form
      .validateFields()
      .then((values) => {
        const input = { ...values };
        if (!input.roles) input.roles = [];
        createUser(input);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div>
      <Row justify={"space-around"}>
        <text className="text-xl">Create a user</text>
      </Row>
      <br />
      <Form {...layout} name="user-register-form" form={form}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Email không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Mật khẩu không được bỏ trống" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: "Họ tên không được bỏ trống" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="roles"
          label="Chức danh "
          rules={[{ required: false }]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select one country"
            onChange={handleChange}
            options={options}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Space>
            <Button
              type="primary"
              onClick={handleCreateUser}
              disabled={loading}
            >
              Tạo người dùng
            </Button>
            <Button type="text" onClick={resetFormFields}>
              Đặt lại
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserRegistrationForm;
