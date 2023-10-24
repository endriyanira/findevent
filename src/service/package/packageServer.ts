import { IPackage } from "@/interfaces/event";
import axios from "axios";

export interface getPackagesParam {
    eventId?:number
}

export class PackageServer{
    static get = async (url:string, params:getPackagesParam) => {
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

    static post = async (url:string, payload:IPackage) =>{
        try {
            const response = await axios({
                method:"POST",
                url:url,
                data:payload
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

    static patch = async (url:string, payload:IPackage) => {
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