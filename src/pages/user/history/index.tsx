import HistoryTabBar from '@/components/HistoryTabBar/HistoryTabBar'
import Navbar from '@/components/Navbar/Navbar'
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from 'react'
import styles from './History.module.scss'
import { PaymentClient } from '@/service/payment/paymentClient'
import { useUser } from '@/store/user/useUser'
import Image  from 'next/image'
import HistoryPaymentCard from '@/components/HistoryPaymentCard/HistoryPaymentCard';
import { UserEventClient } from '@/service/userEvent/userEventClient';
import { IoLocationSharp } from "react-icons/io5";
import { BsTicketPerforatedFill } from 'react-icons/bs'
import { IOrderSummary } from '@/interfaces/event';

export interface ITransactions {
    id:number
    type:string
    userId:number
    amount:number
    description:number
    createdAt:string
}

const History = () => {
    const userData = useUser.use.userData()
    const getUserDetails = useUser.use.getUserDetails()
    const getPaymentList = useUser.use.getPaymentList()
    const getPaymentListSuccess = useUser.use.getPaymentListSuccess()
    const fetchUserEvent = useUser.use.fetchUserEvent()
    const fetchUserEventSuccess = useUser.use.fetchUserEventSuccess()
    const [activeTab, setActiveTab] = useState<string>("My Tickets");
    const [transactions, setTransactions] = useState<ITransactions[]>([])
    const [userEventData, setUserEventData] = useState([])

    const fetchPaymentsHistory = async () => {
        getPaymentList()
        const response = await PaymentClient.getPaymentListByUser({
            userId:userData.id,
            _sort:"createdAt",
            _order:"desc"
        })
        const { data } = response
        setTransactions(data);
        setTimeout(() => {
            getPaymentListSuccess()
        },3000)
    }

    const getTotalTicket = (packages:IOrderSummary[]) => {
        let totalTicket = 0
        for (let i = 0; i < packages.length; i++) {
            totalTicket += packages[i].totalQty;
            
        }
        return totalTicket
    }   

    const checkIsAlreadyWatched = (eventDate:string, eventTime:string) =>{
        const currentDateTime = new Date()
        const givenDateTime = new Date (`${eventDate}, ${eventTime}`)
        return (givenDateTime < currentDateTime) ? "Already Watched" : "On Going"
    }
    
    useEffect(()=>{
        fetchUserEvent()
        getUserDetails()
        fetchUserEvent()
        const fetchUserEvents = async () =>{
            if(userData.id !== 0){
                const response = await UserEventClient.getUserEvent({
                    userId:userData.id
                })
                setUserEventData(response?.data!)
            }
            fetchUserEventSuccess()
        }
        setTimeout(()=>{   
            fetchUserEvents()
        },2000)
        fetchPaymentsHistory()
    },[activeTab, userData.id])
    return (
        <div className='w-full justify-center flex '> 
            <Navbar />
            <div className={styles.HistoryPageWrapper}>
                <p className={styles.HistoryTitleText}>History</p>
                <HistoryTabBar 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                {activeTab === "My Transactions" &&
                    <div className={styles.TransactionsWrapper}>
                        {transactions.map((transaction:ITransactions) =>
                            <HistoryPaymentCard 
                                key={`key:${transaction.id}`}
                                transaction={transaction}
                            />
                        )}
                    </div> 
                }

                {activeTab === "My Tickets" &&
                    <div className='flex flex-col w-full pt-2 rounded-md mb-4'>
                        {userEventData.map((userEvent :any)=>
                        <div key={`key:${userEvent.id} bg-lightBlue p-2 flex flex-row gap-3 border-b-[1px] border-lightBlue rounded-md hover:shadow-TicketCardSmall mb-4`}>
                            <div  className='bg-lightBlue p-2 flex flex-row gap-3 border-b-[1px] border-lightBlue rounded-md hover:shadow-TicketCardSmall mb-4'>
                                <div>
                                    <Image 
                                        src={userEvent.event.thumbnail}
                                        alt=""
                                        width = {500}
                                        height = {500}
                                        className="object-cover h-[150px] w-[120px] rounded-md"
                                    />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className="font-bold">{userEvent.event.title}</p>
                                    <div className='locationWrapper flex flex-row gap-2 justify-start items-center'>
                                        <IoLocationSharp className="event-location-icon text-primaryBlue" />
                                        <p className="event-location-text text-[12px] text-secondaryText font-bold">
                                            {userEvent.event.location}
                                        </p>
                                    </div>
                                    <div className='locationWrapper flex flex-row gap-2 justify-start items-center'>
                                        <BsTicketPerforatedFill className="event-ticket-icon text-primaryBlue" />
                                        <p className="event-location-text text-[12px] text-secondaryText font-bold">
                                        Ticket ({getTotalTicket(userEvent.packages)}) 
                                        </p>
                                    </div>
                                    <div className='locationWrapper flex flex-row gap-2 justify-start items-center'>
                                        <p className="event-location-text text-[12px] text-secondaryText">
                                            {userEvent.event.date}<span className='font-bold'>, {userEvent.event.startTime}</span>
                                        </p>
                                    </div>
                                </div>
                                </div>
                                <div className='relative'>
                                    <p className={`absolute right-3 bottom-8 ${checkIsAlreadyWatched(userEvent.event.date, userEvent.event.time) === "Already Watched" ? 'text-secondaryText' : 'text-primaryBlue font-bold' }`}>{`${checkIsAlreadyWatched(userEvent.event.date, userEvent.event.time) }`}</p>
                                </div>
                        </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default History