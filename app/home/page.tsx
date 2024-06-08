"use client";
import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { UserDetails } from "@/models/user";
import UserInfo from "@/components/UserInfo";

const page = () => {
  const [userDetail, setUserDetail] = useState<UserDetails>();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUserDetail(JSON.parse(user));
  }, []);

  return (
    <Layout>
      <UserInfo user={userDetail} />
    </Layout>
  );
};

export default page;
