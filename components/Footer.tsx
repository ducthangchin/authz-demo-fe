import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 shadow">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 Viettel Digital Talent
        </span>
        <a
          href="https://github.com/ducthangchin"
          target="_blank"
          className="mt-3 flex flex-wrap items-center space-x-1 text-sm font-medium text-gray-500 hover:cursor-pointer sm:mt-0 dark:text-gray-400"
        >
          <Image
            className="relative hover:dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/github.svg"
            alt="Next.js Logo"
            width={30}
            height={30}
            priority
          />
          <text className="hover:underline">@ducthangchin</text>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
