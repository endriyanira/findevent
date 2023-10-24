import AdminSideBar from '@/components/AdminSidebar/AdminSideBar'
import { UserClient } from '@/service/user/userClient'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [data, setData] = useState([])


  // const fetchUsers = async () => {
  //   const response = await UserClient.getUserList()
  //   console.log(response)
  //   setData([...data, response.data])
  // }

  useEffect(()=>{
    const fetchUsers = async () => {
      const response = await UserClient.getUserList()
      console.log(response)
      setData(d => data)
    }
  
    fetchUsers()
  },[data])
  return (
    <div className="admin-users-page flex flex-row">
      <AdminSideBar />
      <div className="admin-users-content-wrapper pl-[350px] w-full flex flex-col justify-between h-[100vh] pb-[200px]">
        
      </div>
    </div>
  )
}

export default Users
