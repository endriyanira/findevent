import React, { useEffect, useState } from "react";
import Image from "next/image";
import Sealand from "../../../public/Sealand.png";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { defaultNavBarItems } from "./NavbarLinks";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { useUser } from "@/store/user/useUser";
import { GiTwoCoins } from 'react-icons/gi'
import { Utils } from '@/utils';

const Navbar = () => {
  const router = useRouter()
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const userData = useUser.use.userData();
  const getUserDetails = useUser.use.getUserDetails();

  const handleLogout = () => {
    deleteCookie('accessToken');
    router.push("/login")
  }

  useEffect(()=>{
    getUserDetails()
  },[])

  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-sm h-16 md:py-4 md:px-[40px]": true, //positioning & styling
      })}
    >
      <div className="w-full h-full flex flex-row justify-between items-center ">
        <div className="font-bold text-lg text-center flex md:justify-center  md:items-center">
          <Image
            className="text-primary"
            alt="logo"
            src={Sealand}
            width={100}
            height={50}
          />
        </div>
        <ul className={`hidden md:block py-2 md:flex md:flex-row md:gap-2`}>
          {defaultNavBarItems.map((item, index) =>
            <Link key={index} href={item.href} className='hover:bg-lightBlue px-2 rounded-lg'>
              <li
                onClick={() => setActive(item.label)}
                className={` hover:text-PrimaryBlue flex gap-4 items-center transition-colors duration-300 rounded-md p-2 mx-2 ${active === item.label ? 'text-primaryBlue' : 'text-secondaryText'}`}
              >
                {item.label}
              </li>
          </Link>
          )}
          <Link href={"/user/topup"} className='flex flex-row justify-center items-center hover:bg-lightBlue px-2 rounded-lg'>
            <GiTwoCoins className='text-primaryBlue' />
              <li
                onClick={() => setActive("topUp")}
                className={` hover:text-PrimaryBlue flex gap-4 items-center transition-colors duration-300 rounded-md p-2 mx-2 font-bold text-primaryBlue`}
              >
                {Utils.convertPrice(userData.balance)}
              </li>
          </Link>
        <button 
          className='py-2 px-4 bg-white border-[1px] border-primaryBlue hover:bg-primaryBlue hover:text-white rounded-lg text-primaryBlue font-bold'
          onClick={() =>handleLogout () }>
          Logout
        </button>
        </ul>
        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } bg-black-gradient absolute pt-3 top-10 right-0 mx-0 h-[250px] w-full flex rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-center items-center flex-1 flex-col bg-white w-full">
            {defaultNavBarItems.map((item, index) => (
              <Link key={index} href={item.href}>
                <li
                  className={`font-medium cursor-pointer text-[16px] ${
                    active === item.label && "text-primaryBlue"
                  } mb-4`}
                  onClick={() => setActive(item.label)}
                >
                  {item.label}
                </li>
            </Link>
            ))}
            <button className='mb-4' onClick={() =>handleLogout () }>
              Logout
            </button>
          </ul>
        </div>
      </div>
        <button className="md:hidden" onClick={()=>setToggle(!toggle)}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
