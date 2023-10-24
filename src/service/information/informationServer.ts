import { IInformation } from "@/interfaces/event"
import axios from "axios"

export interface getInformationsParam{
    eventId?:number
}

export class InformationServer {
    static get =async (url:string, params:getInformationsParam) => {
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

    static post = async (url:string, payload:IInformation) =>{
        try {
            const response = await axios({
                method:'POST',
                url:url,
                data:payload
            })
            if(response.status === 201){
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