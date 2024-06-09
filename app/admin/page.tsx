"use client";
import React from "react";
import Layout from "@/components/Layout";
import UserRegistrationForm from "@/components/admin/UserRegistrationForm";
import { Tabs } from "antd";
import { AdminTabKeys } from "@/constants/AdminTabKey";
import { UserAddOutlined, AppstoreOutlined } from "@ant-design/icons";
import UserManagement from "@/components/admin/UserManagement";

const page = () => {
  const TabItems = [
    {
      label: "Tạo mới người dùng",
      icon: <UserAddOutlined />,
      key: AdminTabKeys.createUser,
      children: <UserRegistrationForm />,
    },
    {
      label: "Quản lý người dùng",
      icon: <AppstoreOutlined />,
      key: AdminTabKeys.manageUser,
      children: <UserManagement />,
    },
  ];
  
  return (
    <Layout>
      <Tabs
        defaultActiveKey={AdminTabKeys.createUser}
        tabPosition={"left"}
        items={TabItems}
      />
    </Layout>
  );
};

export default page;
