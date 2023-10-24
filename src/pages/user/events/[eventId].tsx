import { EventClient } from '@/service/event/eventClient';
import { Utils } from '@/utils';
import { useRouter } from "next/router";
import Image  from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import { LuCalendarDays } from 'react-icons/lu'
import { BiSolidTime } from 'react-icons/bi' 
import EventDetaiTabBar from '@/components/EventDetailTabBar/EventDetaiTabBar';
import TicketItemCard from '@/components/TicketItemCard/TicketItemCard';
import OrderSummaryTotalPriceCard from '@/components/OrderSummaryTotalPriceCard/OrderSummaryTotalPriceCard';
import MerchandiseEventCard from '@/components/MerchandiseEventCard/MerchandiseEventCard';
import Button from '@/components/Button/Button';
import OrderSummaryItem from '@/components/OrderSummaryItem/OrderSummaryItem';
import Modal from '@/components/Modal/Modal';
import { useUser } from '@/store/user/useUser';
import { IEvent, IOrderSummary, IPackage, MerchandiseOrderInfo, TicketOrderInfo } from '@/interfaces/event';
import "react-toastify/dist/ReactToastify.css";
import PaymentModal from '@/components/PaymentModal/PaymentModal';
import TopUpModal from '@/components/TopUpModal/TopUpModal';
import { ToastContainer, ToastContent, TypeOptions, toast } from 'react-toastify';
import { UserEventClient } from '@/service/userEvent/userEventClient';
import { MerchandiseClient } from '@/service/merchandise/merchandiseClient';
import { UserClient } from '@/service/user/userClient';
import { UserEventMerchandiseClient } from '@/service/userEventMerchandise/userEventMerchandiseClient';
import { PackageClient } from '@/service/package/packageClient';
import { PaymentClient } from '@/service/payment/paymentClient';
import Navbar from '@/components/Navbar/Navbar';
import { UserEventPackagesClient } from '@/service/userEventPackages/userEventPackagesClient';
import Head from 'next/head';
interface IEventDetailProps {
    event:IEvent;
    id:number
    thumbnail: string;
    category:string;
    location: string;
    title: string;
    description:string;
    date: string;
    duration: number;
    startTime: string;
    packages: [
        {
        id: number;
        name: string;
        price: number;
        maxQty: number;
        availableTicket: number;
        }
    ];
    merchandises: [
        {
        id: number;
        name: string;
        price: number;
        maxStock: number;
        availableStock: number;
        }
    ];
    informations: [
        {
        id: number;
        title: string;
        description: string;
        }
    ];
}


export default function EventDetail({
    event
  } : IEventDetailProps) {
    const { description } = event
    const [activeTab, setActiveTab] = useState<string>("Information");
    const [orderSummaryTickets, setOrderSummaryTickets] = useState<IOrderSummary[]>([])
    const [orderSummaryMerchandises, setOrderSummaryMerchandises] = useState<IOrderSummary[]>([])
    const [orderSummaryPrice, setOrderSummaryPrice] = useState(0)
    const [showConfirmationMerchandise, setShowConfirmationMerchandise] = useState<boolean>(false)
    const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)
    const [showTopUpModal, setShowTopUpModal] = useState<boolean>(false)
    const [topUpSuccessfully, setTopUpSuccessFully] = useState<boolean>(false)
    const topUp = useUser.use.topUp()
    const topUpSuccess = useUser.use.topUpSuccess();
    const loading = useUser.use.loading()
    const checkout = useUser.use.checkout()
    const checkoutSuccess = useUser.use.checkoutSuccess()
    const router = useRouter();
    const userData = useUser.use.userData();
    const getUserDetails = useUser.use.getUserDetails();
    const getMerchandiseByEventId = useUser.use.getMerchandiseByEventId()
    const merchandisesByEventId = useUser.use.merchandisesByEventId()
    const getPackageByEventId = useUser.use.getPackageByEventId()
    const packagesByEventId = useUser.use.packagesByEventId()
    const getInformationsByEventId = useUser.use.getInformationsByEventId()
    const informationsByEventId = useUser.use.informationsByEventId()

    const handleAddTicket = (ticket: TicketOrderInfo) => {
      setOrderSummaryPrice(orderSummaryPrice + ticket.price)
      if(orderSummaryTickets.length === 0){
        ticket.availableTicket -= 1
        setOrderSummaryTickets([...orderSummaryTickets, {
          totalPrice:ticket.price,
          totalQty:1,
          ticket:ticket
        }])
      } else {
        const i = orderSummaryTickets.findIndex((orderTicket) => orderTicket.ticket?.id === ticket.id)
        if(i !== -1){
          const ticketFromOrderSummary = orderSummaryTickets[i];
          const updatedTicketFromOrderSummary = {...ticketFromOrderSummary}
          updatedTicketFromOrderSummary.totalPrice += ticket.price;
          updatedTicketFromOrderSummary.totalQty += 1
          if(updatedTicketFromOrderSummary.ticket){
            updatedTicketFromOrderSummary.ticket.availableTicket -= 1
          }
          const updatedOrderSummaryTickets = [...orderSummaryTickets]
          updatedOrderSummaryTickets[i] = updatedTicketFromOrderSummary
          setOrderSummaryTickets(updatedOrderSummaryTickets)
        } else {
          ticket.availableTicket -= 1
          setOrderSummaryTickets([...orderSummaryTickets, {
            totalPrice:ticket.price,
            totalQty:1,
            ticket:ticket
          }])
        }
      }
    }

    const handleRemoveTicket = (ticket: TicketOrderInfo)  => {
      setOrderSummaryPrice(orderSummaryPrice - ticket.price)
      const i = orderSummaryTickets.findIndex((orderTicket) => orderTicket.ticket?.id === ticket.id)
      if(i !== -1 ){
        const ticketFromOrderSummary = orderSummaryTickets[i];
        const updatedTicketFromOrderSummary = {...ticketFromOrderSummary}
        updatedTicketFromOrderSummary.totalPrice -= ticket.price;
        updatedTicketFromOrderSummary.totalQty -= 1
        if(updatedTicketFromOrderSummary.ticket){
          updatedTicketFromOrderSummary.ticket.availableTicket += 1
        }
        const updatedOrderSummaryTickets = [...orderSummaryTickets]
        if(updatedTicketFromOrderSummary.totalPrice === 0 ){
          updatedOrderSummaryTickets.splice(i,1);
          setOrderSummaryTickets(updatedOrderSummaryTickets)
        } else {
          updatedOrderSummaryTickets[i] = updatedTicketFromOrderSummary
          setOrderSummaryTickets(updatedOrderSummaryTickets)
        }
      }
    }

    const handleAddMerchandise = (merch: MerchandiseOrderInfo) => {
      setOrderSummaryPrice(orderSummaryPrice + merch.price)
      if(orderSummaryMerchandises.length === 0){
        merch.availableStock -= 1
        setOrderSummaryMerchandises([...orderSummaryMerchandises, {
          totalPrice:merch.price,
          totalQty:1,
          merch:merch
        }])
      } else {
        const index = orderSummaryMerchandises.findIndex((orderMerch) => orderMerch.merch?.id === merch.id)
        if(index !== -1){
          const merchFromOrderSummary = orderSummaryMerchandises[index]
          const updatedMerchFromOrderSummary = {...merchFromOrderSummary}
          updatedMerchFromOrderSummary.totalPrice += merch.price
          updatedMerchFromOrderSummary.totalQty += 1
          if(updatedMerchFromOrderSummary.merch){
            updatedMerchFromOrderSummary.merch.availableStock -= 1
          }
          const updatedOrderSummaryMerchandises = [...orderSummaryMerchandises]
          updatedOrderSummaryMerchandises[index] = updatedMerchFromOrderSummary
          setOrderSummaryMerchandises(updatedOrderSummaryMerchandises)
        } else {
          merch.availableStock -= 1
          setOrderSummaryMerchandises([...orderSummaryMerchandises, {
            totalPrice:merch.price,
            totalQty:1,
            merch:merch
          }])
        }
      }
    }

    const handleRemoveMerchandise = (merch: MerchandiseOrderInfo) => {
      setOrderSummaryPrice(orderSummaryPrice - merch.price)
      const index = orderSummaryMerchandises.findIndex((orderMerch) => orderMerch.merch?.id === merch.id)
      if(index !== -1){
        const merchFromOrderSummary = orderSummaryMerchandises[index]
        const updatedMerchFromOrderSummary = {...merchFromOrderSummary}
        updatedMerchFromOrderSummary.totalPrice -= merch.price
        updatedMerchFromOrderSummary.totalQty -= 1
        if(updatedMerchFromOrderSummary.merch){
          updatedMerchFromOrderSummary.merch.availableStock += 1
        }
        const updatedOrderSummaryMerchandises = [...orderSummaryMerchandises]
        if(updatedMerchFromOrderSummary.totalPrice === 0){
          updatedOrderSummaryMerchandises.splice(index,1)
          setOrderSummaryMerchandises(updatedOrderSummaryMerchandises)
        } else {
          updatedOrderSummaryMerchandises[index] = updatedMerchFromOrderSummary
          setOrderSummaryMerchandises(updatedOrderSummaryMerchandises)
        }
      }
    }

    const handleCheckout = (e:React.MouseEvent<HTMLButtonElement, MouseEvent> | any) =>{
      getUserDetails()
      if(orderSummaryMerchandises.length === 0 && !e.target.id){
        setShowConfirmationMerchandise(true)
      } else {
        setShowConfirmationMerchandise(false)
        setShowPaymentModal(true)

      }
    }
    
    const notify = (message: ToastContent, type: TypeOptions) => {
      toast(message, {
          type: type,
          position: toast.POSITION.TOP_RIGHT,
      });
    };


    const handleTopUp = () =>{
      getUserDetails()
      setShowTopUpModal(true)
    }
    
    const handleConfirmPayment = async () =>{
      getUserDetails()
      if(orderSummaryPrice > userData.balance){
        notify("Insufficient Balance Please TopUp" as ToastContent, "error");
      } else {
        checkout(orderSummaryTickets, orderSummaryMerchandises, orderSummaryPrice, event?.id! as number)
        // update user balance
        await UserClient.updateBalance(userData.id, {
          balance: userData.balance - orderSummaryPrice
        })

        // create new userEvent object
        const userEventResponse = await UserEventClient.createUserEvent({
          userId : userData.id, 
          eventId: event.id as number,
          event:event,
          merchandise:orderSummaryMerchandises,
          packages:orderSummaryTickets
        })

        // create new userEventMerchandise object
        for await (const merch of orderSummaryMerchandises) {
          await UserEventMerchandiseClient.create({
            userEventId:userEventResponse?.data.eventId,
            merchandiseId: merch.merch?.id,
            quantity:merch.totalQty,
            name:merch.merch?.name
          })
        }
        
        // create new userEventPackage object
        for await (const ticket of orderSummaryTickets) {
          await UserEventPackagesClient.create({
            userEventId:userEventResponse?.data.eventId,
            packageId: ticket.ticket?.id,
            quantity:ticket.totalQty,
            name:ticket.ticket?.name
          })
        }
        
        // decrement package available Ticket in packages table (by package id, and request body)
        for await (const order of orderSummaryTickets) {
          //update available ticket in package table
          await PackageClient.updatePackageById(order.ticket?.id!, {
            availableTicket:order.ticket?.availableTicket!
          }) 
        }

        if(orderSummaryMerchandises.length !== 0){
          // decrement merchandise available stock in merchandises table (by merchandise id, and request body)
          for await (const order of orderSummaryMerchandises) {
            //update available ticket in merchandise table
            await MerchandiseClient.updateMerchandiseById(order.merch?.id!, {
              availableStock:order.merch?.availableStock!
            })
          }
        }

        //create new record in payments table
        await PaymentClient.buyEvent({
          userId:userData.id,
          type:"debit",
          description: `Buy Event, name: ${event.title}`,
          amount: orderSummaryPrice
        })

        setTimeout(()=>{
          checkoutSuccess()
          notify("Payment Sucessfully" as ToastContent, "success");
          setShowPaymentModal(false)
          router.push('/user/history')
        },3000)
      }
    }

    useEffect(()=>{
      const handleTopUpSuccess = () =>{
        if(topUpSuccessfully){
          notify("Top Up Success" as ToastContent, "success");
          setTimeout(()=>{
            setTopUpSuccessFully(false)
            setShowTopUpModal(false)
          },1000)
        }
      }

      getMerchandiseByEventId(event.id as number)
      getPackageByEventId(event.id as number)
      getInformationsByEventId(event.id as number)
      handleTopUpSuccess()
    },[topUpSuccessfully, event.id, getInformationsByEventId, getMerchandiseByEventId, getPackageByEventId])

    return( 
      <>
        <Head>
          <title>Attractions & Entertainment | Walt Disney World Resort | {event.title} Ticket</title>
          <meta name="sealand" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Fragment>
          <ToastContainer />
          <Navbar />
          <div className="EventDetailWrapper h-full w-full bg-white md:pt-[50px] pb-6">
              <div className='EventDetailThumWrapper'>
                  <Image
                      className='w-[100vw] h-[200px] md:h-[500px] object-cover'
                      src={event.thumbnail}
                      alt="thumbnail"
                      width={1600}
                      height={900}
                  />
              </div>
              <div className="flex justify-center items-center w-full">
                <div className='flex flex-col md:w-[70vw] px-5 justify-center'>
                  <div className='flex flex-col justify-center items-center gap-5'>
                    <div className='EventDetailInfoWrapper flex flex-row justify-between bg-white shadow-lg mx-5 rounded-lg p-[15px] md:p-[40px] h-fit items-end md:w-[70vw] w-full'>
                      <div className='EventDetailContent flex flex-col w-full'>
                        <div className='EventDetailCategoryLocation flex flex-row gap-2 items-center mb-2'>
                            <div className='EventDetailCategory flex flex-row gap-1 text-secondaryText items-center'>
                                <p className='EventCategoryText text-[12px] md:text-[16px]'>{event.category}</p>
                            </div>
                            <div className='EventDetailLocation flex flex-row gap-2 items-center'>
                                <IoLocationSharp className="text-primaryBlue text-[12px]  md:text-[16px]" />
                                <p className='EventLocationText text-[12px]  md:text-[16px]'>{event.location}</p>
                            </div>
                        </div>
                        <div className="EventDetailLeftInfo w-full flex flex-col md:gap-[16px]">
                            <div className='EventDetailTitle flex mb-2'>
                                <p className='EventDetailTitleText font-bold text-[16px]  md:text-[32px]'>{event.title}</p>
                            </div>
                            <div className='flex flex-row justify-between items-end w-full'>
                              <div className="EventDetailDateDurationStartTimePrice flex flex-row justify-between">
                                  <div className='EventDetailDateDurationStartTime flex flex-col gap-1 md:gap-[10px]'>
                                      <div className='EventDetailDate flex flex-row items-center gap-2 md:gap-3'>
                                          <LuCalendarDays className="text-primaryBlue text-[12px] md:text-[26px]" />
                                          <p className='EventDetailDateText text-[12px] md:text-[20px] text-secondary'>
                                            {event.date}
                                          </p>
                                      </div>
                                      <div className='EventDetailDate flex flex-row items-center gap-2 md:gap-3'>
                                          <BiSolidTime className="text-primaryBlue text-[12px] md:text-[26px]" />
                                          <p className='EventDetailDateText text-[12px] md:text-[20px] text-secondary'>
                                            {event.duration} Minutes
                                          </p>
                                      </div>
                                      <div className='EventDetailDate flex flex-row items-center gap-2 md:gap-3'>
                                          <p className='EventDetailDateText text-[12px] md:text-[20px] text-secondary'>
                                            Start Time : {event.startTime}
                                          </p>
                                      </div>
                                  </div>
                              </div>
                              {packagesByEventId.length !== 0 && 
                                <div className='EventPriceWrapper h-full flex-col items-end justify-end'>
                                    <p className='EventPriceStartFromText text-[12px] text-secondary text-right md:text-[24px]'>Start from</p>
                                    <p className='EventPriceText text-red-500 text-[16px] font-bold md:text-[36px]'>{Utils.convertPrice(packagesByEventId !== undefined ? packagesByEventId[0].price as number : 0)}</p>
                                </div>
                              }
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className='EventDetailInfoDescription w-full'>
                      <p className='EventDetailInfoDescriptionText text-left text-[12px] pb-[50px] text-secondaryText md:text-[18px]'>
                        {description}
                      </p>
                    </div>
                  </div>
                  {/* Tab Bar and Order Summary */}
                  <div className='EventDetailTabBarOrderSummary flex flex-col md:grid md:grid-cols-2 w-full items-center justify-center md:gap-8 pb-6'>
                    <div className='EventDetailTabBar w-full items-center md:flex md:flex-row'>
                      <div className='flex flex-col w-full'>
                        <EventDetaiTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
                        {/* Informations */}
                        {activeTab === "Information" &&
                          <div className='EventDetailInformationWrapper py-5'>
                            {informationsByEventId.map((info : {id:number, title:string, description:string}) => 
                              <div key={`key:${info.id}`} className='InformationWrapper flex flex-col gap-3 pb-3'>
                                <p className='InformationTitleText text-[14px] md:text-[20px]'>{info.title}</p>
                                <p className='InformationDescText text-[12px] md:text-[16px]'>{info.description}</p>
                              </div>
                            )}
                          </div>
                        }
                        {/* ticket packages */}
                        {activeTab === "Ticket" && 
                          <div className='EventDetailTabListItemWrapper py-5'>
                            {packagesByEventId.map((ticket : any ) => 
                              <TicketItemCard 
                                key={ticket.name} 
                                ticket={ticket} 
                                orderSummaryTickets={orderSummaryTickets} 
                                handleRemoveTicket={handleRemoveTicket}  
                                handleAddTicket={handleAddTicket}
                              />
                            )}
                          </div>
                        }
                        {/* merchandises */}
                        {activeTab === "Merchandise" &&
                          <div className='EventDetailTabListItemWrapper py-5 flex flex-col gap-3'>
                            <p className='EventDetailmerchandiseText text-left text-[12px] font-semibold'>
                              Get official merchandise from this event
                            </p>
                            {merchandisesByEventId.map((merchandise :MerchandiseOrderInfo) =>
                              <MerchandiseEventCard 
                                key={`key:${merchandise.name}`} 
                                merch={merchandise} 
                                orderSummaryMerchandises={orderSummaryMerchandises}
                                handleAddMerchandise={handleAddMerchandise}
                                handleRemoveMerchandise={handleRemoveMerchandise}
                                />
                            )}
                          </div>
                        }
                      </div>
                    </div>
                    <div className='flex flex-col w-full h-full'>
                      {/* Order summary Items */}
                      {(orderSummaryTickets.length !== 0 || orderSummaryMerchandises.length !== 0) &&
                        <div className='EventDetailOrderSummary w-full rounded-[30px] shadow-lg py-5 px-7 flex flex-col justify-center items-center mb-4'>
                            <div className='EventDetailOrderSummaryTitle w-full flex justify-start items-start pb-3 border-b-[1px] border-[#B7B7B7'>
                              <p className='EventDetailOrderSummaryTitleText text-[14px] font-bold text-left'>Order Summary</p>
                            </div>
                            {orderSummaryTickets.map((ticketOrder) => 
                              <OrderSummaryItem 
                                key={`key:${ticketOrder?.ticket!.name}`} 
                                item={ticketOrder} 
                              />
                            )}
                            {orderSummaryMerchandises.map((merchOrder) => 
                              <OrderSummaryItem 
                                key={`key:${merchOrder?.merch!.name}`} 
                                item={merchOrder} 
                              />
                            )}
                            
                          <OrderSummaryTotalPriceCard 
                            orderSummaryPrice={orderSummaryPrice}  
                          />
                        </div>
                      }
                      {/* Order Summary Ends */}
                      <div className='w-full'>
                        {activeTab === "Information" &&
                          <Button 
                            defaultButton 
                            active 
                            big 
                            label="Buy Ticket" 
                            type="button" 
                            onClick={()=>setActiveTab("Ticket")} 
                          />
                        }
                        {activeTab === "Ticket" && orderSummaryTickets.length !== 0 &&
                          <Button 
                            defaultButton 
                            active 
                            big 
                            label="Continue" 
                            type="button" 
                            onClick={()=>setActiveTab("Merchandise")} 
                          />
                        }
                        {orderSummaryTickets.length !== 0 &&
                        activeTab === "Merchandise"  && 
                          <Button 
                            defaultButton 
                            active 
                            big 
                            label="Checkout" 
                            type="button" 
                            onClick={(e)=>handleCheckout(e)} 
                          />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <Modal isVisible={showConfirmationMerchandise} onClose={()=>setShowConfirmationMerchandise(false)}>
            <div className='MerchandiseConfirmationModal flex flex-col justify-center items-center p-3 gap-4 h-[300px]'>
              <p className='Title text-center font-bold'>{"Are you sure don't want to buy official merchandise from this event?"}</p>
              <div className='flex flex-row items-center gap-3 w-[200px] justify-between'>
                <Button
                  label="No" 
                  type={'button'}     
                  active
                  defaultButton
                  big
                  onClick={()=>setShowConfirmationMerchandise(false)}
                />
                <Button
                  label="Yes" 
                  type={'button'} 
                  big
                  secondary
                  defaultButton
                  onClick={(e)=>handleCheckout(e)}
                  id="yesButton"
                />
              </div>
            </div>
          </Modal>
          <PaymentModal 
            isVisible={showPaymentModal} 
            onClose={()=>setShowPaymentModal(false)} 
            orderSummaryTickets={orderSummaryTickets}
            orderSummaryMerchandises={orderSummaryMerchandises}
            orderSummaryPrice={orderSummaryPrice}
            userData={userData}
            setShowTopUpModal={handleTopUp}
            handleConfirmPayment={handleConfirmPayment}
          />
          <TopUpModal 
            userData={userData}
            getUserDetails={getUserDetails}
            topUp={topUp}
            topUpSuccess={topUpSuccess}
            loading={loading}
            isVisible={showTopUpModal}
            onClose={()=>setShowTopUpModal(false)}
            handleTopUpSuccess={()=>setTopUpSuccessFully(true)}
          />
        </Fragment>
      </>
    );
  }

interface IEventDetailProp {
    eventId: number;
}

export const getServerSideProps = async ({
    params,
  }: {
    params: IEventDetailProp;
  }) => {
    try {
      if (!params) {
        return {
          notFound: true,
        };
      }
      const response = await EventClient.fetchEventDetail(params.eventId);
      const event: IEventDetailProps = response?.data!;
      if (!event.id) {
        return {
          notFound: true,
        };
      } else {
        return { props: { event } };
      }
    } catch (error) {
      console.log(error);
    }
  };
  