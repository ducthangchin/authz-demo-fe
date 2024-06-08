import { AdminTabKeys } from '@/constants/AdminTabKey'
import React, { Children } from 'react'

const useGetAdminTabs = () => {
    const tabItems = [
        {
            label: "Tạo mới người dùng",
            key: AdminTabKeys.createUser,
            children: "fjla"
        }, 
    ]

  return (
    <div>useGetAdminTabs</div>
  )
}

export default useGetAdminTabs