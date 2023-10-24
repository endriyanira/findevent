import { IOrderSummary } from '@/interfaces/event'
import { Utils } from '@/utils'
import React from 'react'

type EventTicketPackageProps = {
    item: IOrderSummary
}

const OrderSummaryItem = ({item}: EventTicketPackageProps) => {
  return (
    <div key={`key:${item.ticket? item.ticket.name : item.merch?.name}`} className='OrderSummaryItemsWrapper mx-5 w-full py-2 border-b-[1px] border-[#B7B7B7]'>
        <div className='OrderSummaryItemWrapper flex flex-col justify-between gap-2'>
        <div className='OrderSummaryItemName flex flex-wrap justify-start items-start'>
            <p className='OrderSummaryItemNameText text-left text-primaryBlue text-[14px]'>{item.ticket? item.ticket.name : item.merch?.name}</p>
        </div>
        <div className='OrderSummaryTotalTicketPrice flex flex-row justify-between item-center'>
          {item.ticket ?
            <p className='OrderSummaryTotalTicketNameText text-secondary text-[12px]'>
              {`${item.totalQty} ${item.totalQty === 1 ?'Ticket': 'Tickets' }`}
            </p>
          :
            <p className='OrderSummaryTotalTicketNameText text-secondary text-[12px]'>
              {`${item.totalQty} ${item.totalQty === 1 ?'Item': 'Items' }`}
            </p>
          }
            <p className='OrderSummaryTotalTicketPriceText text-primaryBlue font-bold'>{Utils.convertPrice(item.totalPrice)}</p>
        </div>
        </div>
    </div>
  )
}

export default OrderSummaryItem
