import React, { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { BASE_URL } from "@/service/constants";
import axios from "axios";
import EventCard from "@/components/EventCard/EventCard";
import Button from "@/components/Button/Button";
import { EVENTS_CATEGORIES,DATA_SORT_BY } from "@/constants/events";
import Select from "@/components/Select/Select";

const EventsHeading = () => {
  return (
    <div className="events-hero-heading-wrapper bg-white">
      <Image
        className="w-[400px] h-[150px] md:w-[100vw] md:h-[500px] object-cover md:object-cover"
        alt="world-theme-park"
        src={
          "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1440/540/75/dam/disney-world/admission/WDW_SWGE_1440x358.png"
        }
        width={2000}
        height={500}
      />
    </div>
  );
};

const Events = () => {
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [isMaxData, setIsMaxData] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("title");

  const fetchEvents = async (url: string) => {
    const response = await axios({
      method: "GET",
      url: url,
    });
    if (response.data.length !== 5) {
      setIsMaxData(true);
    }
    setEventsData([...eventsData, ...response.data]);
    return response.data;
  };

  const handleChangeCategory = (categoryName: string) => {
    setEventsData([]);
    setCurrentPage(1);
    setSelectedCategory(categoryName);
  };

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventsData([]);
    setCurrentPage(1);
    setSortBy(e.target.value);
  };

  const { error, isLoading } = useSWR(
    `${BASE_URL}/events/?_page=${currentPage}&_limit=${5}&_sort=${sortBy}&_order=asc&category_like=${
      selectedCategory === "All" ? "" : selectedCategory
    }`,
    fetchEvents,
    {
      revalidateOnFocus: false,
    }
  );

  if (error) return <div>Something Error...</div>;

  return (
    <>
      <div className="events-page-wrapper flex flex-col justify-center items-center bg-white">
        <EventsHeading />
        <div className=" w-full flex flex-row gap-2 justify-center items-center p-2 border-b md:h-[100px] ">
          {EVENTS_CATEGORIES.map((category) =>
            category.name === selectedCategory ? (
              <Button
                key={`key:${category.name}`}
                small
                active
                primary
                type="button"
                label={category.name}
                onClick={() => handleChangeCategory(category.name)}
              />
            ) : (
              <Button
                key={`key:${category.name}`}
                small
                secondary
                type="button"
                label={category.name}
                onClick={() => handleChangeCategory(category.name)}
              />
            )
          )}
        </div>
        {eventsData.length !== 0 && (
          <div className="selectSortBy flex justify-center items-center w-[300px]">
            <Select data={DATA_SORT_BY} onChange={(e) => handleChangeSortBy(e)} />
          </div>
        )}

        <div className="md:px-[200px] justify-center">
          {eventsData.length === 0 && <div>Empty Data</div>}
          {isLoading ? (
            <div>loading...</div>
          ) : (
            <div className="events-list-wrapper md:flex md:flex-row md:flex-wrap md:justify-between md:gap-6 py-4">
              {/* {eventsData.map((event: any, index: number) => (
                <EventCard
                  key={String(`key:${index}`)}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  place={event.place}
                  price={event.price}
                  thumbnail={event.image}
                  id={event.id}
                />
              ))} */}
            </div>
          )}

          {!isMaxData && (
            <Button
              secondary
              label="More"
              type="button"
              onClick={handleLoadMore}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Events;
