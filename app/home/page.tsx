"use client";
import React, { useMemo } from "react";
import Layout from "@/components/Layout";
import { UserDetails } from "@/models/user";
import UserInfo from "@/components/UserInfo";

const page = () => {
  const userDetail: UserDetails = useMemo(() => {
    const user = localStorage.getItem("user");
    if (user) return JSON.parse(user);
    else return null;
  }, []);

  return (
    <Layout>
      <UserInfo user={userDetail} />
    </Layout>
  );
};

export default page;
