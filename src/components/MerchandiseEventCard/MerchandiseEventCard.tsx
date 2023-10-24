import React from 'react'
import Image  from 'next/image'
import { Utils } from '@/utils'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { IOrderSummary, MerchandiseOrderInfo } from '@/interfaces/event'

type MerchandiseEventCardProps = {
    merch:MerchandiseOrderInfo
    orderSummaryMerchandises:IOrderSummary[]
    handleAddMerchandise : (merch: MerchandiseOrderInfo) => void
    handleRemoveMerchandise : (merch: MerchandiseOrderInfo) => void
}

const MerchandiseEventCard = ({merch, orderSummaryMerchandises,handleAddMerchandise, handleRemoveMerchandise}:MerchandiseEventCardProps) => {
  const i = orderSummaryMerchandises.findIndex((order) => order.merch?.id === merch.id);

  return (
    <div className="MerchandiseEventCardWrapper flex-1 w-full bg-white border-2 border-primaryBlue shadow-TicketCardSmall p-3 rounded-lg mb-5">
        <div className='MerchandiseEventCardThumInfo flex flex-row gap-3'>
            <Image src={merch.image} alt={'merchandise'} width={100} height={100} className='object-cover w-[100px] h-[100px]'  />
            <div className='MerchandiseEventCardInfo md:w-full flex flex-col justify-between  border-b-[1px]border-primaryBlue pb-2 gap-2'>
                <p className='MerchandiseEventCardInfoText text-[14px] md:text-[16px] font-semibold'>{merch.name}</p>
                <p className='MerchandiseEventCardInfoText text-[16px] md:text-[16px] text-red-500 font-bold'>{Utils.convertPrice(merch.price)}</p>
                <div className='MerchandiseQuantityWrapper flex justify-between items-center'>
                    <p className='MerchandiseQuantityText text-[12px] font-extralight'>Quantity</p>
                    <div className='EventDetailQty flex flex-row gap-3 items-center'>
                        <button 
                            className='QuantityButtonAction'
                            disabled={i === -1} 
                            onClick={() => handleRemoveMerchandise (merch)}
                        >
                        <AiOutlineMinusCircle 
                            className={`${i === -1 && "text-secondaryText"} md:text-[20px]`} 
                        />
                        </button>
                        <div className='QuantityText'>
                        <p className='text-light text-[12px] md:text-[20px]'>
                            {i !== -1?  orderSummaryMerchandises[i].totalQty : 0}
                        </p>
                        </div>
                        <button 
                            className='QuantityButtonAction'
                            disabled={i !== -1 && orderSummaryMerchandises[i].merch?.availableStock === 0} 
                            onClick={()=>handleAddMerchandise(merch)}
                        >
                        <AiOutlinePlusCircle 
                             className={`md:text-[20px] ${i !== -1 && orderSummaryMerchandises[i].merch?.availableStock === 0 && 'text-secondaryText'}`} 
                        />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MerchandiseEventCard
