import AdminSideBar from "@/components/AdminSidebar/AdminSideBar";
import Button from "@/components/Button/Button";
import Select from "@/components/Select/Select";
import { BASE_URL } from "@/service/constants";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import { AiFillDelete } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { Utils } from "@/utils";
import { EVENTS_CATEGORIES, DATA_SORT_BY } from "@/constants/events";
import Link from "next/link";
import { IEvent } from "@/interfaces/event";

const Events = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [isMaxData, setIsMaxData] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("title");
  const [totalPage, setTotalPage] = useState<number>(0);

  const fetchEvents = async (url: string) => {
    const response = await axios({
      method: "GET",
      url: url,
    });
    const headers : any = response.headers

    setTotalPage(Math.ceil(headers.get('x-total-count') / 5))

    if (response.data.length <= 5 && (pageIndex === totalPage)) {
      setIsMaxData(true);
    }
    const responseAPI: IEvent[] = response.data;
    if (responseAPI.length <= 5 && (pageIndex === totalPage)) {
      setIsMaxData(true);
    } else {
      setIsMaxData(false);
    }
    return responseAPI;
  };

  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/events/?_page=${pageIndex}&_limit=${5}&_sort=${sortBy}&_order=asc&category_like=${
      selectedCategory === "All" ? "" : selectedCategory
    }`,
    fetchEvents,
    {
      revalidateOnFocus: false,
    }
  );

  console.log(error)

  if (error) return <div>Something Error...</div>;

  return (
    <div className="admin-events-page flex flex-row">
      <AdminSideBar />
      <div className="admin-events-content-wrapper pl-[350px] w-full flex flex-col justify-between h-[100vh] pb-[200px]">
        <div className="admin-event-content py-10 px-[76px]">
          <div className="admin-events-heading flex flex-row justify-between items-center">
            <h1 className="admin-event-heading-title text-[28px] font-bold text-[#102E61]">
              EVENTS ADMINISTRATIONS
            </h1>
            <Link href="/admin/events/add">
              <Button primary active type="button" label="Add Event" />
            </Link>
          </div>
          <div className="admin-event-filter-wrapper flex flex-row gap-10">
            <div className="admin-events-filter w-[200px] mt-10 flex items-center gap-2">
              <p className="text-primaryBlue font-bold">Category</p>
              <Select
                data={EVENTS_CATEGORIES}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
            </div>
            <div className="admin-events-filter w-[200px] mt-10 flex ">
              <Select
                data={DATA_SORT_BY}
                onChange={(e) => setSortBy(e.target.value)}
              />
            </div>
          </div>
          <div className="admin-events-table-wrapper flex w-full mt-[30px]">
            <table className=" w-full text-left table-fixed">
              <thead className="border-b bg-lightBlue font-bold text-darkBlue dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4 w-[10%]">
                    No
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Event Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4 w-[10%]">
                    Start Time
                  </th>
                  <th scope="col" className="px-6 py-4 w-[10%]">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Location
                  </th>
                  <th colSpan={3} className="px-6 py-4 text-center w-[15%]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((event: IEvent, index: number) => (
                  <tr key={`key:${event.title}`} className={`${index % 2 === 0 ? 'bg-white' : 'bg-lightGrey'} hover:bg-lightBlue`}>
                    <td className="whitespace-nowrap px-6 py-4">{(5 * (pageIndex)) + (index) - 4}</td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis px-6 py-4">
                      {event.title}
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis px-6 py-4">
                      {Utils.convertPrice(event.price)}
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis px-6 py-4">
                      {event.date}
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis px-6 py-4">
                      {event.startTime}
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis px-6 py-4">
                      {event.duration} Minutes
                    </td>
                    <td className="whitespace-nowrap overflow-hidden text-ellipsis px-6 py-4">
                      {event.location}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <button>
                        <TbEdit size={28} className="text-primaryBlue" />
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <button>
                        <AiFillDelete size={28} className="text-primaryBlue" />
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <button>
                        <BiDotsVerticalRounded
                          size={28}
                          className="text-primaryBlue"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="paginationButtons flex flex-row justify-center items-center gap-4 w-[300px] fixed">
            <Button
              disabled={pageIndex === 1}
              label="<"
              type="button"
              active={pageIndex !== 1}
              defaultButton
              onClick={() => setPageIndex(pageIndex - 1)}
            />
            <div className='w-full'>
              <p className='text-center text-[16px]'>{`${pageIndex} of ${totalPage}`}</p>
            </div>
            <Button
              disabled={isMaxData}
              label=">"
              active={!isMaxData}
              type="button"
              defaultButton
              onClick={() => setPageIndex(pageIndex + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
