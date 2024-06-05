import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/constants/Paths";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export interface NavBarProps {
  pathName?: string;
}

const NavBar = (props: NavBarProps) => {
  const { pathName } = props;

  const router = useRouter();

  const DEFAULT_LINK_TAILWIND =
    "block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500";
  const ACTIVE_LINK_TAILWIND =
    "block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 dark:text-white md:dark:text-blue-500";

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    router.push("/sign-in");
  }, []);

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            className="relative hover:dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/viettel.png"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Authz app
          </span>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
            <li>
              <Link
                className={
                  pathName === PATHS.HOME
                    ? ACTIVE_LINK_TAILWIND
                    : DEFAULT_LINK_TAILWIND
                }
                href="/home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathName === PATHS.ADMIN
                    ? ACTIVE_LINK_TAILWIND
                    : DEFAULT_LINK_TAILWIND
                }
                href="/admin"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathName === PATHS.DOCUMENT
                    ? ACTIVE_LINK_TAILWIND
                    : DEFAULT_LINK_TAILWIND
                }
                href="/document"
              >
                Document
              </Link>
            </li>
            <li>
              <Link
                className={
                  pathName === PATHS.SALARY
                    ? ACTIVE_LINK_TAILWIND
                    : DEFAULT_LINK_TAILWIND
                }
                href="/salary"
              >
                Salary
              </Link>
            </li>
            <li>
              <div
                className={`${DEFAULT_LINK_TAILWIND} flex cursor-pointer space-x-1`}
                onClick={handleLogout}
              >
                <LogoutOutlined style={{ fontSize: "1.25rem" }} />
                <text className="align-middle">Logout</text>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
