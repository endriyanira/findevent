import { Utils } from '@/utils'
import React from 'react'
import Button from '../Button/Button'

type OrderSummaryTotalPriceCardProps = {
    orderSummaryPrice:number
}

const OrderSummaryTotalPriceCard = ({orderSummaryPrice}:OrderSummaryTotalPriceCardProps) => {
  return (
    <div className='EventDetailOrderSummaryTotalPrice w-full flex flex-row justify-between py-4 items-center'>
        <p className='EventDetailOrderSummaryTotalText text-[16px] font-bold'>Total</p>
        <p className='EventDetailOrderSummaryTotalPriceText font-bold text-[20px]'>{Utils.convertPrice(orderSummaryPrice)}</p>
    </div>
  )
}

export default OrderSummaryTotalPriceCard
