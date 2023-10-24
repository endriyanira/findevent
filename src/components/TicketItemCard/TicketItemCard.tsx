import React from 'react'
import { Utils } from '@/utils'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { IOrderSummary, TicketOrderInfo } from '@/interfaces/event'

type TicketItemCardProps = {
  ticket:TicketOrderInfo
  handleRemoveTicket : (ticket:TicketOrderInfo) => void
  handleAddTicket : (ticket:TicketOrderInfo) => void
  orderSummaryTickets:IOrderSummary[]
}
const TicketItemCard = ({ ticket, orderSummaryTickets, handleRemoveTicket, handleAddTicket} : TicketItemCardProps) => {
  const i = orderSummaryTickets.findIndex((order) => order.ticket?.id === ticket.id);

  return (
    <div className="EventDetailTabItemsWrapper flex-1 w-full bg-white border-2 border-primaryBlue shadow-TicketCardSmall p-3 rounded-lg mb-5">
      <div className='EventDetailTicketInfo flex flex-row justify-between w-full border-b-[1px] border-dashed border-primaryBlue pb-2'>
        <p className='EventDetailTicketInfoText text-primaryBlue text-[12px] md:text-[16px] '>{ticket.name}</p>
        <p className='EventDetailTicketInfoAvailableTicketText text-secondary text-[10px]'>{`${ticket.availableTicket} ${ticket.availableTicket === 1 ? 'Ticket': 'Tickets'} Left` } </p>
      </div>
      <div className='EventDetailPriceQty flex flex-row justify-between pt-2'>
        <div className='EventDetailPrice'>
          <p className='EventDetailPriceText font-bold md:text-[20px]'>{Utils.convertPrice(ticket.price)}</p>
        </div>
        <div className='EventDetailQty flex flex-row gap-3 items-center'>
            <button 
              className='QuantityButtonAction' 
              disabled={i === -1} 
              onClick={()=>handleRemoveTicket(ticket)}
            >
              <AiOutlineMinusCircle className={`${i === -1 && "text-secondaryText"} md:text-[20px]`} />
            </button>
            <div className='QuantityText'>
              <p className='text-light text-[12px] md:text-[20px]'>{i !== -1?  orderSummaryTickets[i].totalQty : 0}</p>
            </div>
            <button 
              className='QuantityButtonAction' 
              disabled={i !== -1 && orderSummaryTickets[i].ticket?.availableTicket === 0} 
              onClick={()=>handleAddTicket(ticket)}
            >
              <AiOutlinePlusCircle className={`md:text-[20px] ${i !== -1 && orderSummaryTickets[i].ticket?.availableTicket === 0 && 'text-secondaryText'}`} />
            </button>
        </div>
      </div>
    </div>
  )
}

export default TicketItemCard
