import React, { DOMAttributes, ReactNode } from 'react'
import  { AiOutlineCloseCircle } from 'react-icons/ai'
interface ModalProps {
    isVisible:boolean
    onClose:()=>void
    children:ReactNode
}
const Modal = ({isVisible, onClose, children}: ModalProps) => {
    if(!isVisible) return null   

    const handleCloseModal = (e: any) => {
      if(e.target.id === 'wrapper'){
        onClose()
      }
    }
  return (
    <div 
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[2px] flex flex-col justify-center items-center z-50' 
      id="wrapper" onClick={(e)=>handleCloseModal(e)}>
      <div className='bg-white p-2 rounded-lg w-[90vw] md:w-[50vw] flex flex-col justify-center h-fit overflow-x-hidden overflow-y-auto'>
        <button onClick={()=>onClose()} className=''>
          <AiOutlineCloseCircle 
            className='text-secondary hover:text-red-500 w-[30px] h-[30px]' 
          />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
