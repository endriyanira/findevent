import { IEvent } from "@/interfaces/event";
import { BASE_URL } from "../constants";
import { EventServer, IEventsParams } from "./eventServer";

export class EventClient {
  static fetchEvents = async (params: IEventsParams) =>{
    const response = await EventServer.get(`${BASE_URL}/events`, params)
    return response
  }

  static fetchEventDetail = async (eventId:number) => {
    const response = await EventServer.get(`${BASE_URL}/events/${eventId}`)
    return response
  }

  static createEvent = async (payload:IEvent) =>{
    const response = await EventServer.post(`${BASE_URL}/events`, payload)
    return response
  }

}
