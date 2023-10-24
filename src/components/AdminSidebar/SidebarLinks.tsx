import { BiSolidDashboard } from "react-icons/bi";
import { IoTicket } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { ReactNode } from "react";

export interface SideBarItem {
  label: string;
  href: string;
  icon: ReactNode;
}

export const defaultSideBarItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <BiSolidDashboard className="w-6 h-6" />,
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: <IoTicket className="w-6 h-6" />,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: <HiOutlineUsers className="w-6 h-6" />,
  },
];
