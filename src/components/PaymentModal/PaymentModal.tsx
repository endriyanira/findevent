import React, { useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import "react-toastify/dist/ReactToastify.css";
import { IOrderSummary } from '@/interfaces/event'
import OrderSummaryItem from '../OrderSummaryItem/OrderSummaryItem'
import OrderSummaryTotalPriceCard from '../OrderSummaryTotalPriceCard/OrderSummaryTotalPriceCard'
import { FaMoneyBillWaveAlt } from 'react-icons/fa'
import { UserData } from '@/interfaces/user'
import { Utils } from '@/utils'
import Button from '../Button/Button'
import { ToastContainer, ToastContent, TypeOptions, toast } from 'react-toastify'
import { useUser } from '@/store/user/useUser'
import { ThreeDots } from 'react-loader-spinner';

type PaymentModalProps = {
    isVisible:boolean
    onClose:()=>void
    orderSummaryTickets:IOrderSummary[]
    orderSummaryMerchandises:IOrderSummary[]
    orderSummaryPrice:number
    userData:UserData
    setShowTopUpModal:()=>void
    handleConfirmPayment:()=>void
}

const PaymentModal = ({
    isVisible, 
    onClose, 
    orderSummaryTickets, 
    orderSummaryMerchandises,
    orderSummaryPrice,
    userData,
    setShowTopUpModal,
    handleConfirmPayment
}:PaymentModalProps) => {
    const loading = useUser.use.loading()


    return (
        <Modal isVisible={isVisible} onClose={onClose}>
            <ToastContainer />
            <div className='PaymentModalWrapper justify-center items-center p-3 h-[calc(100%-3rem)]'>
                {(orderSummaryTickets.length !== 0 || orderSummaryMerchandises.length !== 0) &&
                    <div className='EventDetailOrderSummary w-full rounded-[30px] shadow-lg py-5 px-7 flex flex-col justify-center items-center mb-4'>
                        <div className='EventDetailOrderSummaryTitle w-full flex justify-start items-start pb-3 border-b-[1px] border-[#B7B7B7'>
                            <p className='EventDetailOrderSummaryTitleText text-[14px] font-bold text-left'>
                                Order Summary
                            </p>
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
                <div className='WalletBalance flex flext row justify-between items-center w-full py-4 border-b-[1px] border-secondary'>
                    <div className='WalletBalanceIconText flex flex-row gap-2 items-center'>
                        <FaMoneyBillWaveAlt className='text-primaryBlue' />
                        <p className='WalletBalanceText'>Wallet Balance</p>
                    </div>
                    <p className='WalletBalanceAmountText font-bold'>{Utils.convertPrice(userData?.balance)}</p>
                </div>
                {loading ? 
                    <div className="flex flex-col w-full justify-center items-center">
                        <ThreeDots 
                            height="80" 
                            width="70"
                            radius="9"
                            color="#3273DC" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            />
                    </div>
                :
                    <div className='buttons w-full flex flex-col gap-4 py-5'>  
                        <Button
                            label='Confirm Payment'
                            big
                            active
                            defaultButton
                            type='button'
                            onClick={()=>handleConfirmPayment()}
                        />
                        <Button 
                            label='Top Up'
                            big
                            secondary
                            defaultButton
                            type='button'
                            onClick={()=>setShowTopUpModal()}
                        />
                    </div>
                }
            </div>
        </Modal>
    )
}

export default PaymentModal
