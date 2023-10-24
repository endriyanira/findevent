import { IMerchandise } from "@/interfaces/event"
import { BASE_URL } from "../constants"
import { MerchandiseServer, GetMerchandisesParams } from "./merchandiseServer"

export class MerchandiseClient{
    static getMerchandiseListByEvent = async (params: GetMerchandisesParams) => {
        const response = await MerchandiseServer.get(`${BASE_URL}/merchandises`, params)
        return response
    }

    static updateMerchandiseById = async (merchId:number, payload: IMerchandise) =>{
        const response = await MerchandiseServer.patch(`${BASE_URL}/merchandises/${merchId}`, payload)
        return response
    }

    static postMerchandise = async (payload:IMerchandise) => {
        const response = await MerchandiseServer.post(`${BASE_URL}/merchandises`, payload)
        return response
    }
}