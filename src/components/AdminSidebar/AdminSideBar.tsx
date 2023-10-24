import React, { useEffect } from "react";
import { SideBarItem, defaultSideBarItems } from "./SidebarLinks";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useUser } from "@/store/user/useUser";
import { UserData } from "@/interfaces/user";


type AdminSideBarProps = {
  sideBarItems?: SideBarItem[];
};

const AdminSideBar = ({
  sideBarItems = defaultSideBarItems,
}: AdminSideBarProps) => {
  const router = useRouter();
  const userData = useUser.use.userData()
  const getUserDetails = useUser.use.getUserDetails()
  
  const handleLogout = () => {
    deleteCookie('accessToken');
    router.push("/login")
  }

  useEffect(()=>{
    getUserDetails()
  },[])
  return (
    <div
      className={classNames({
        "flex flex-col justify-between w-[300px] h-[100vh] fixed": true, // layout
        "bg-indigo-700 text-white-50": true, // colors
      })}
    >
      
      <nav className="h-[100vh] ">
      <AdminSideBarHeading
        userData={userData}
      />
      <div className="relative h-full">
        <ul className="py-2 flex flex-col gap-2">
          {sideBarItems.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    "text-white hover:bg-indigo-900 hover:text-white": true,
                    "flex gap-4 items-center ": true,
                    "transition-colors duration-300": true,
                    "rounded-md p-2 mx-2": true,
                    "bg-darkBlue text-white":
                      router.pathname === item.href ||
                      router.pathname === `${item.href}/add`,
                  })}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
        <button 
          className='py-2 px-4 bg-primaryBlue rounded-lg text-white font-bold absolute w-full bottom-[100px]'
          onClick={() =>handleLogout () }>
          Logout
      </button>
      </div>
      </nav>
    </div>
  );
};

type AdminSideBarHeadingProps = {
  userData:UserData
}

const AdminSideBarHeading = ({userData}:AdminSideBarHeadingProps) => {
  return (
    <div className="border-b border-b-indigo-800 p-4 bg-lightBlue">
      <div className="flex gap-4 items-center">
        <Image
          src={
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
          height={36}
          width={36}
          alt="profile image"
          className="rounded-full"
        />
        <div className="flex flex-col ">
          <span className="text-darkBlue my-0">{`${userData.firstName} ${userData.lastName}`}</span>
          {/* <Link href="/profile" className="text-darkBlue text-sm">
            View Profile
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;
