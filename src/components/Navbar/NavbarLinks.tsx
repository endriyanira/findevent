import { BiSolidDashboard } from "react-icons/bi";
import { IoTicket } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { ReactNode } from "react";

export interface NavBarItem {
  label: string;
  href: string;
}

export const defaultNavBarItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Events",
    href: "/",
  },
  {
    label: "Profile",
    href: "/user/profile",
  },

];
