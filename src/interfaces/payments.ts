export interface IPaymentRequest {
    userId:number
    type:string
    description:string
    amount:number
}

export interface IPaymentResponse {
    id:number
    userId:number
    type:string
    description:string
    amount:number
}

export interface PaymentData {
    id:number
    userId:number
    type:string
    description:string
    amount:number
}