"use client";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    } else {
      router.push("/sign-in");
    }
  }, []);

  return (
    <section className="bg-gray-900 dark:bg-gray-900">
      <main className="color-white flex min-h-screen flex-col items-center justify-between p-24">
        <Spin
          size="large"
          fullscreen={true}
          tip={<text className="text-2xl">Checking for validation...</text>}
        ></Spin>
      </main>
    </section>
  );
}
