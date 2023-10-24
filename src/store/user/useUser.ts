import { create } from "zustand";
import { createZusSelector } from "../useSelector";
import { IUserWalletInfo, UserData } from "@/interfaces/user";
import { IPaymentRequest, PaymentData } from "@/interfaces/payments";
import { UserClient } from "@/service/user/userClient";
import { getCookie } from 'cookies-next';
import jwt_decode from "jwt-decode";
import { IEventsParams } from "@/service/event/eventServer";
import { EventClient } from "@/service/event/eventClient";
import { IOrderSummary, IPackage } from "@/interfaces/event";
import { MerchandiseClient } from "@/service/merchandise/merchandiseClient";
import { PackageClient } from "@/service/package/packageClient";
import { InformationClient } from "@/service/information/informationClient";
import { PaymentClient } from "@/service/payment/paymentClient";

type State = {
    isAuthenticated:boolean
    userData: UserData
    userWalletInfo : IUserWalletInfo
    userTransactionsInfo : PaymentData[]
    loading:boolean
    events:[]
    orderSummaryTickets:IOrderSummary[]
    orderSummaryMerchandises:IOrderSummary[]
    orderSummaryPrice:number
    topUpSuccessFully:boolean
    merchandisesByEventId :[]
    packagesByEventId:IPackage[]
    informationsByEventId:[]
    loadingGetListPayment : boolean
    loadingChangePage:boolean
    loadingPostEvent:boolean
    loadingFetchUserEvent:boolean
}

export interface OrderSummaryItem{
    id:number, 
    name:string, 
    price:number
}

type Actions ={
    login:()=>void
    loginSuccess:()=>void
    setUser: (newUserData: UserData) => void
    topUp : (paymentRequestData: IPaymentRequest, userData: UserData, updatedBalance:number) => void
    topUpSuccess : () => void;
    buyEvent:()=>void;
    getUserDetails: () => void;
    getMerchandiseByEventId : (eventId:number) => void
    getPackageByEventId:(eventId:number) => void
    getInformationsByEventId:(eventId:number)=>void
    fetchEvents:(page:number, limit:number, sort:string, category:string)=>void;
    checkout:(orderSummaryTickets:IOrderSummary[], orderSummaryMerchandises:IOrderSummary[], orderSummaryPrice:number, eventId: number) => void
    checkoutSuccess:()=>void
    getPaymentList: () => void
    getPaymentListSuccess : () => void
    changePage:()=>void
    changePageSuccess:()=>void
    postEvent:()=>void
    postEventSuccess:()=>void
    fetchUserEvent:()=>void
    fetchUserEventSuccess:()=>void

}

export interface IDecodedToken {
    email:string
    iat: number
    exp: number
    sub:string
}

const useUserBase = create<State & Actions>((set) => ({
    isAuthenticated:false,
    userData:{
        id:0, 
        email:"",
        firstName:"",
        lastName:"",
        balance:0,
        walletId:0,
        password:"",
        age:0,
    },
    userWalletInfo : {
        id:0,
        userId:0,
        balance:0
    },
    userTransactionsInfo:[],
    loading:false,
    events:[],
    orderSummaryTickets:[],
    orderSummaryMerchandises:[],
    orderSummaryPrice:0,
    topUpSuccessFully:false,
    merchandisesByEventId:[],
    packagesByEventId:[],
    informationsByEventId:[],
    loadingGetListPayment:false,
    loadingChangePage:false,
    loadingPostEvent:false,
    loadingFetchUserEvent:false,
    getPaymentList:()=>{
        set(() => ({loadingGetListPayment : true}))
    },
    getPaymentListSuccess:()=>{
        set(() => ({loadingGetListPayment : false}))
    },
    login:()=>{
        set(()=>({loading:true}))
    },
    loginSuccess:()=>{
        set(()=>({loading:false}))
    },
    setUser: (newUserData: UserData) => set(()=>({userData: newUserData })
    ),
    getUserDetails: async () => {
        const token = getCookie("accessToken");
        const decodedToken : IDecodedToken = jwt_decode(token!);
        const userDetail = await UserClient.getUserDetails(decodedToken.sub);
        const data : UserData = userDetail?.data
        set(()=>({userData:data }))
    },
    topUp : async (paymentRequestData: IPaymentRequest, userData :UserData, updatedBalance:number) => {
        set(()=>({loading:true}))
        set(()=>({topUpSuccessFully:false}))
        const paymentResponse = await PaymentClient.topUp(paymentRequestData)
        if(!paymentResponse?.error){
            const amount = paymentResponse?.data.amount
            const updatedUserBalance = {
                balance: updatedBalance
            }
            // const updatedUserData = {...userData, balance: userData.balance+amount}
            await UserClient.updateBalance(userData.id, updatedUserBalance)
            set((state) => ({
                userTransactionsInfo:[...state.userTransactionsInfo, paymentResponse?.data!]
            }))
        }
    },
    topUpSuccess : () => {
        set(() => ({loading : false}))
        set(()=>({topUpSuccessFully:true}))
        setTimeout(()=>{
            set(()=>({topUpSuccessFully:false}))
        },2000)
    },
    fetchEvents:async (page:number, limit:number, sort:string, category:string)=> {
        const params :IEventsParams = {
            _page:page,
            _limit:limit,
            _sort:sort,
            _category_like:category
        } 
        const eventsResponse = await EventClient.fetchEvents(params);
        set((state)=>({
            events:eventsResponse?.data
        }))
    },
    checkout:async (orderSummaryTickets:IOrderSummary[], orderSummaryMerchandises:IOrderSummary[], newOrderSummaryPrice:number, eventId: number)=>{
        set(()=>({loading:true}))
        set(()=>({...orderSummaryTickets, orderSummaryTickets}))
        set(()=>({...orderSummaryMerchandises, orderSummaryMerchandises}))
        set(()=>({orderSummaryPrice : newOrderSummaryPrice}))
    },
    checkoutSuccess:()=>{
        set(()=>({loading:false}))
    },
    getMerchandiseByEventId : async (eventId:number) => {
        const response = await MerchandiseClient.getMerchandiseListByEvent({eventId: eventId})
        set((state) => ({
            merchandisesByEventId: response.data
        }))
    },
    getPackageByEventId: async (eventId:number)=>{
        const response = await PackageClient.getPackageListByEvent(eventId);
        set((state) => ({
            packagesByEventId: response.data
        }))
    },
    getInformationsByEventId: async (eventId:number)=>{
        const response = await InformationClient.getInformationListByEvent({eventId: eventId});
        set((state) => ({
            informationsByEventId: response.data
        }))
    },
    buyEvent:()=>{},
    changePage:()=>{
        set(()=>({loadingChangePage:true}))
    },
    changePageSuccess:()=>{
        set(()=>({loadingChangePage:false}))
    },
    postEvent:()=>{
        set(()=>({loadingPostEvent:true}))
    },
    postEventSuccess:()=>{
        set(()=>({loadingPostEvent:false}))
    },
    fetchUserEvent:()=>{
        set(()=>({
            loadingFetchUserEvent:true
        }))
    },
    fetchUserEventSuccess:()=>{
        set(()=>({
            loadingFetchUserEvent:false
        }))
    }
}))

export const useUser = createZusSelector(useUserBase);
