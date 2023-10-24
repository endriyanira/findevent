import { IPaymentRequest, IPaymentResponse } from "@/interfaces/payments";
import { IUserRequest, IUserResponse, UserData, UserDataRequest } from "@/interfaces/user";
import axios from "axios";

export interface ISignUp {
  email: string;
  password: string;
}
export class UserService {
  static post = async (url: string, payload: IUserRequest | IPaymentRequest) => {
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: payload,
      });

      if (response.status === 201 || response.status === 200) {
        const responseAPI = {
          error: false,
          data: response.data,
          message: response.statusText,
        };

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
  };

  static get = async (url:string, params?:any) => {
    try {
      const response = await axios({
        method:"GET",
        url:url,
        params:params
      })
      if(response.status === 201 || response.status === 200){
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

  static patch = async (url:string, payload: UserDataRequest ) =>{
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
