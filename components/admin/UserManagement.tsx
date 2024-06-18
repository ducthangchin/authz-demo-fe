import useGetRoles from "@/hooks/roles/useGetRoles";
import useGetAllUserProfiles from "@/hooks/user/useGetAllUserProfiles";
import { Button, Form, Input, Row, Select, SelectProps, Space } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { filterOption } from "@/utils/filters";
import useGetProfile from "@/hooks/user/useGetProfile";
import { compareArrays } from "@/utils/commons";
import useUpdateUser from "@/hooks/user/useUpdateUser";
import { UserUpdateRequest } from "@/models/user";
import { ReloadOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};

const UserManagement = () => {
  const [form] = Form.useForm();
  const userId = Form.useWatch("id", form);

  const [isEdited, setIsEdited] = useState(false);

  const { loading, getUserProfiles, profiles } = useGetAllUserProfiles();
  const { loading: updatingUser, updateUser } = useUpdateUser();
  const { loading: loadingProfile, profile, getProfile } = useGetProfile();
  const { roles, getRoles } = useGetRoles();

  const userOptions = useMemo(
    () =>
      profiles.map((profile) => ({
        value: profile.id,
        label: `${profile.fullName} (ID: ${profile.id})`,
      })),
    [profiles],
  );

  const roleOptions: SelectProps["options"] = useMemo(
    () =>
      roles.map((role) => ({
        label: role.roleName,
        value: role.id,
      })),
    [roles],
  );

  const resetFormFields = () => {
    if (!profile) {
      form.resetFields();
      return;
    }
    form.setFieldValue("email", profile.email);
    form.setFieldValue("fullName", profile.fullName);
    form.setFieldValue("manager", profile.managerId);
    form.setFieldValue("roles", mapRoleNameToId(profile.roles));
    onFormChange();
  };

  useEffect(() => {
    getUserProfiles();
    getRoles();
  }, []);

  useEffect(() => {
    userId && getProfile(userId);
  }, [userId]);

  useEffect(() => {
    resetFormFields();
  }, [profile, roles]);

  const onFormChange = useCallback(() => {
    if (!profile) {
      setIsEdited(false);
    } else if (
      form.getFieldValue("fullName") != profile?.fullName ||
      !compareArrays(
        form.getFieldValue("roles"),
        mapRoleNameToId(profile?.roles),
      ) ||
      form.getFieldValue("manager") !== profile.managerId
    ) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [form, profile]);

  const mapRoleNameToId = useCallback(
    (roleNames: string[]) => {
      return roles
        .filter((role) => roleNames.includes(role.roleName))
        .map((role) => role.id);
    },
    [roles],
  );

  const submitForm = () => {
    form
      .validateFields()
      .then((values) => {
        const data: UserUpdateRequest = {
          fullName: values["fullName"],
          roles: values["roles"],
          manager: values["manager"],
        };
        console.log(data);
        userId &&
          updateUser(userId, values).then(() => {
            getProfile(userId);
            getUserProfiles();
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  return (
    <div>
      <Row justify={"space-around"}>
        <text className="text-xl">User Management</text>
      </Row>
      <br />
      <Form
        {...layout}
        name="user-management-form"
        form={form}
        onValuesChange={onFormChange}
      >
        <Form.Item
          name="id"
          label="Chọn người dùng"
          rules={[{ required: true, message: "Hãy chọn người dùng" }]}
        >
          <Select
            options={userOptions}
            loading={loading}
            showSearch
            placeholder="Tìm kiếm người dùng"
            filterOption={filterOption}
            suffixIcon={<ReloadOutlined onClick={getUserProfiles} />}
          />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Họ tên"
          rules={[{ required: true, message: "Họ tên không được bỏ trống" }]}
        >
          <Input disabled={!userId} />
        </Form.Item>
        <Form.Item name="manager" label="Quản lý">
          <Select
            options={userOptions}
            loading={loading}
            disabled={!userId}
            suffixIcon={<ReloadOutlined onClick={getUserProfiles} />}
            showSearch
            placeholder="Tìm kiếm người dùng"
            filterOption={filterOption}
          />
        </Form.Item>
        <Form.Item
          name="roles"
          label="Chức danh "
          rules={[{ required: false }]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select roles"
            options={roleOptions}
            disabled={!userId}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Space>
            <Button
              type="primary"
              onClick={submitForm}
              disabled={!isEdited || loadingProfile}
            >
              Lưu thay đổi
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

export default UserManagement;
