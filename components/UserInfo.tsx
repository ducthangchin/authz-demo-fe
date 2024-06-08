import { UserDetails } from "@/models/user";
import React from "react";

export interface UserInfoProps {
  user?: UserDetails;
}

const UserInfo = (props: UserInfoProps) => {
  const { user } = props;
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="p-4">
        <p className="text-gray-700">
          <span className="font-bold">Họ tên:</span> {user?.fullName}
        </p>
        <p className="mt-2 text-gray-700">
          <span className="font-bold">ID:</span> {user?.id}
        </p>
        <p className="mt-2 text-gray-700">
          <span className="font-bold">Email:</span> {user?.email}
        </p>
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800">Chức danh:</h3>
          <ul className="list-inside list-disc">
            {user?.roles.map((role, index) => (
              <li key={index} className="text-gray-700">
                {role}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
