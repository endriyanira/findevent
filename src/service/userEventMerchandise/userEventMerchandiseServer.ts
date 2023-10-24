import axios from "axios"

export interface UserEventMerchandiseData {
    id?:number
    userEventId?:number
    merchandiseId?:number
    quantity?:number
    name?:string
}

export class UserEventMerchandiseServer {
    static post = async (url:string, payload:UserEventMerchandiseData) =>{
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

    static get = async (url:string, params:UserEventMerchandiseData) => {
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