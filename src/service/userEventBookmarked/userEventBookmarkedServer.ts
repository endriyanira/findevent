import axios from "axios"

export interface UserEventBookmarkedData{
    id?:number
    userId?:number
    eventId?:number
}

export class UserEventBookmarkedServer{
    static post = async (url:string, payload:UserEventBookmarkedData) =>{
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

    static delete = async (url:string) => {
        try {
            const response = await axios ({
                method:'DELETE',
                url:url,
            })
        } catch (error) {
            
        }
    }
}