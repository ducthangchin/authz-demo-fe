"use client";
import React, { useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { UserDetails } from "@/models/user";
import { Tag, Typography } from "antd";
import { ROLE_TAGS_COLOR } from "@/constants/RoleTag";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [userDetail, setUserDetail] = useState<UserDetails>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
    }
    const user = localStorage.getItem("user");
    if (user) setUserDetail(JSON.parse(user));
  }, []);

  const getColor = (idx: number) =>
    ROLE_TAGS_COLOR[idx % ROLE_TAGS_COLOR.length];

  return (
    <section className="bg-gray-500 dark:bg-sky-900">
      <div className="container relative mx-auto min-h-screen bg-white">
        <header className="w-full">
          <NavBar pathName={pathName} />
          <div className="p-4">
            <span className="flex space-x-4 text-xl">
              <text className="font-bold">{userDetail?.fullName}</text>
              <div>
                {userDetail?.roles?.map((role, idx) => (
                  <Tag key={idx} color={getColor(idx)}>
                    {role}
                  </Tag>
                ))}
              </div>
            </span>
            <Typography.Text type={"secondary"}>
              ID: {userDetail?.id}
            </Typography.Text>
          </div>
        </header>
        <div className="px-4 pb-8">{children}</div>
        <div className="absolute bottom-0 left-0 w-full text-center">
          <Footer />
        </div>
      </div>
    </section>
  );
};

export default Layout;
