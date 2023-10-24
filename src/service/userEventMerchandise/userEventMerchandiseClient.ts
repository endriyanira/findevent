import { BASE_URL } from "../constants";
import { UserEventMerchandiseData, UserEventMerchandiseServer } from "./userEventMerchandiseServer";

export class UserEventMerchandiseClient {
    static create = async (payload:UserEventMerchandiseData) => {
        const response = await UserEventMerchandiseServer.post(`${BASE_URL}/userEventMerchandise`, payload)
        return response
    }

    static getUserEventMerchandise = async (params:UserEventMerchandiseData) =>{
        const response = await UserEventMerchandiseServer.get(`${BASE_URL}/userEventMerchandise`, params)
    }
}