"use client";
import React, { useEffect } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/sign-in");
    }
  }, []);

  return (
    <section className="bg-gray-500 dark:bg-sky-900">
      <div className="container relative mx-auto min-h-screen bg-white">
        <header className="w-full">
          <NavBar pathName={pathName} />
        </header>
        <div className="p-4">{children}</div>
        <div className="absolute bottom-0 left-0 w-full text-center">
          <Footer />
        </div>
      </div>
    </section>
  );
};

export default Layout;
