import { IPaymentRequest } from "@/interfaces/payments"
import { BASE_URL } from "../constants"
import { PaymentService } from "./paymentService"

export class PaymentClient {
    static topUp = async (paymentRequestData: IPaymentRequest) => {
        const response = await PaymentService.post(`${BASE_URL}/payments`, paymentRequestData)
        return response
    }

    static buyEvent = async (payload: IPaymentRequest) =>{
        const response = await PaymentService.post(`${BASE_URL}/payments`, payload)
        return response
    }

    static getPaymentListByUser = async (params: {userId:number, _sort:string, _order:string}) =>{
        const response = await PaymentService.get(`${BASE_URL}/payments`, params)
        return response
    }
}