export interface IOrderSummary{
  totalPrice:number,
  totalQty:number,
  ticket?:TicketOrderInfo
  merch?:MerchandiseOrderInfo
}

export interface TicketOrderInfo {
  id:number
  name:string
  price:number
  maxQty:number,
  availableTicket:number
}

export interface MerchandiseOrderInfo {
  id:number
  name:string
  price:number
  maxStock:number,
  availableStock:number
  image:string
}

export interface IPackage {
  id?:number
  eventId?:number
  name?:string
  price?:number
  maxQty?:number
  availableTicket?:number
}

export interface IMerchandise {
  id?:number
  eventId?:number
  name?:string
  price?:number
  maxStock?:number
  availableStock?:number
  image?:string
}

export interface IInformation {
  id?:number
  eventId?:number
  title?:string
  description?:string
}

export interface IEvent {
  title: string;
  description:string;
  date: string;
  startTime:string;
  duration:number
  location: string;
  category:number
  price: number;
  thumbnail: string;
  id?: number;
}

export interface IEvent {
  title: string;
  description:string;
  date: string;
  startTime:string;
  duration:number
  location: string;
  category:number
  price: number;
  thumbnail: string;
  id?: number;
  merchandises?:IOrderSummary;
  packages?:IOrderSummary
}