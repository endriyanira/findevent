import { IEvent } from "@/interfaces/event";
import axios from "axios";

export interface IEventsParams {
  _page:number,
  _limit:number,
  _sort?:string,
  _category_like?:string
}

export class EventServer {
  static async get(url: string, params? : IEventsParams) {
    try {
      const response = await axios({
        method: "GET",
        url: url,
        params:params
      });

      if(response.status === 200 ){
        const responseAPI = {
          error:false,
          data:response.data,
          message: response.statusText
        }
        return responseAPI;
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

  static post = async (url:string, payload:IEvent) => {
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
        return responseAPI;
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
