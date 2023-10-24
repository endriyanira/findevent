import { IPaymentRequest } from "@/interfaces/payments";
import { Utils } from "@/utils";
import axios from "axios";

export class PaymentService {
    static post = async (url:string, payload : IPaymentRequest) => {
        try {
            const now = Utils.createdAt()
            const response = await axios({
              method: "post",
              url: url,
              data: {...payload, createdAt: now}
            })
      
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
    }

    static get = async (url:string, params:{userId:number}) => {
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
}