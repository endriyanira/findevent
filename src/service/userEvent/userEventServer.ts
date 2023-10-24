import { IEvent, IOrderSummary } from "@/interfaces/event"
import axios from "axios"

export interface CreateUserEventResponse {
    id:number,
    userId:number
    eventId:number
}

export interface CreateUserEventRequest {
    userId:number
    eventId:number
    merchandise?:IOrderSummary[],
    packages?:IOrderSummary[]
    event?:IEvent
    id?:number
}


export class UserEventServer {
    static post = async (url:string, payload:CreateUserEventRequest) => {
        try {
            const response = await axios ({
                method:'POST',
                url:url,
                data:payload
            })

            if(response.status === 200 || response.status === 201){
                const responseAPI = {
                    error:false,
                    data:response.data,
                    message: response.statusText
                }

                return responseAPI
            }
        } catch (error: any) {
            const responseAPI = {
                error: true,
                data: null,
                message: error.response.data,
            };
            return responseAPI;
        }
    }

    static get = async (url:string, params:any) => {
        try {
           const response  = await axios({
            method:'GET',
            url:url,
            params:params
           })
           if(response.status === 200){
            const responseAPI = {
                error:false,
                data:response.data,
                message: response.statusText
            }

            return responseAPI
           }
        } catch (error: any) {
            const responseAPI = {
                error: true,
                data: null,
                message: error.response.data,
            };
            return responseAPI;
        }
    }
}