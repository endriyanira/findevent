import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoLocationSharp } from "react-icons/io5";
import { BiTime } from 'react-icons/bi'
import { Utils } from "@/utils";

interface IEventCard {
  event:{
    title: string;
    description:string;
    date: string;
    startTime:string;
    duration:number
    time: string;
    location: string;
    categrory:number
    price: number;
    thumbnail: string;
    id: number;
  },
  handleDirectDetailPage:(eventId:number)=>void
}

const EventCard = ({
  event,
  handleDirectDetailPage
}: IEventCard) => {
  const router = useRouter();

  return (
    <div 
      className="event-card-wrapper flex flex-col w-[300px] bg-white shadow-lg rounded-xl mb-4 hover:cursor-pointer hover:shadow-TicketCardSmall"
      onClick={() => handleDirectDetailPage(event.id)}
    >
      <div className="event-card-thumbnail">
        <Image
          src={event.thumbnail}
          alt={event.title}
          width={348}
          height={200}
          className="w-[348] h-[196px] object-cover rounded-tl-xl rounded-tr-xl"
        />
      </div>
      <div className="event-card-info flex flex-col p-5 gap-6 justify-between">
        <div className="event-card-title-time flex flex-col gap-1">
          <h1 className="event-title text-[16px] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            {event.title}
          </h1>
          <p className="event-date text-[14px] font-light text-secondaryText">
            {event.date}
          </p>
          <div className="event-card-startTime flex flex-row items-center gap-3">
            <BiTime className="event-startTime-icon text-primaryBlue" />
            <p className="event-time text-[14px] font-light text-secondaryText ">
              {event.startTime}
            </p>
          </div>
          <div className="event-card-place flex flex-row items-center gap-3">
            <IoLocationSharp className="event-location-icon text-primaryBlue" />
            <p className="event-location-text text-[14px] text-secondaryText">
              {event.location}
            </p>
          </div>
        </div>
        <div className="eventPriceBookmarked flex flex-row justify-between items-center">
          <div className="event-card-price flex flex-col">
            <p className="event-price-start-form-text text-secondaryText text-[14px]">
              Start From
            </p>
            <p className="event-price-text text-darkBlue font-bold text-[20px]">
              {Utils.convertPrice(event.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
