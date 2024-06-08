"use client";
import React from "react";
import Layout from "@/components/Layout";
import UserRegistrationForm from "@/components/admin/UserRegistrationForm";

const page = () => {
  return (
    <Layout>
      <UserRegistrationForm />
    </Layout>
  );
};

export default page;
