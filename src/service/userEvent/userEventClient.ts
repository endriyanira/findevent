import { BASE_URL } from "../constants"
import { CreateUserEventRequest, UserEventServer } from "./userEventServer"

export class UserEventClient {
   static createUserEvent = async (payload:CreateUserEventRequest) => {
    const response = await UserEventServer.post(`${BASE_URL}/userEvent`, payload)
    return response
   } 

   static getUserEvent = async (params:any)=>{
      const response = await UserEventServer.get(`${BASE_URL}/userEvent`, params)
      return response
   }
   
}