import { IInformation } from "@/interfaces/event";
import { BASE_URL } from "../constants";
import { InformationServer, getInformationsParam } from "./informationServer";

export class InformationClient {
    static getInformationListByEvent = async (params:getInformationsParam) => {
        const response = await InformationServer.get(`${BASE_URL}/informations`, params)
        return response
    }

    static postInformation = async (payload:IInformation) => {
        const response = await InformationServer.post(`${BASE_URL}/informations`, payload)
    }
}