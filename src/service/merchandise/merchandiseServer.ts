import { IEvent, IMerchandise } from "@/interfaces/event"
import axios from "axios"

export interface GetMerchandisesParams {
    eventId?:number
}

export class MerchandiseServer {
    static get = async (url :string, params:GetMerchandisesParams) => {
        try {
            const response = await axios ({
                method: 'GET',
                url:url,
                params: params
            })


            const responseAPI = {
                error:false,
                data:response.data,
                message: response.statusText
            }

            return responseAPI

        } catch (error: any) {
            const responseAPI = {
                error: true,
                data: null,
                message: error.response.data,
            };
            return responseAPI;
        }
    }

    static post = async (url:string, payload:IMerchandise) => {
        try {
            const response = await axios({
                method:'POST',
                url:url,
                data: payload
            })
            if(response.status === 201){
                const responseAPI= {
                    error:false,
                    data:response.data,
                    message:response.statusText
                }
                return responseAPI;
            }
        } catch (error:any) {
            const responseAPI =  {
                error: true,
                data: null,
                message: error.response.data,
            };
            return responseAPI;
        }
    }

    static patch = async (url:string, payload:IMerchandise) => {
        try {
            const response = await axios({
                method:'PATCH',
                url:url,
                data: payload
            })
            if(response.status === 200){
                const responseAPI= {
                    error:false,
                    data:response.data,
                    message:response.statusText
                }
                return responseAPI;
            }
        } catch (error:any) {
            const responseAPI =  {
                error: true,
                data: null,
                message: error.response.data,
            };
            return responseAPI;
        }
        
    }
}