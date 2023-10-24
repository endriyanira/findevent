import React, { useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner"; 
import { Utils } from '@/utils';
import { IPaymentRequest } from '@/interfaces/payments'
import { UserData } from '@/interfaces/user';
import { ToastContainer, ToastContent, TypeOptions, toast } from 'react-toastify';
import Button from '../Button/Button';
import TextArea from '../TextArea/TextArea';
import Input from '../Input/Input';
import Modal from '../Modal/Modal';

type TopUpModalProps = {
  userData: UserData
  getUserDetails: () => void
  topUp:(paymentRequestData: IPaymentRequest, userData: UserData, balance:number) => void
  topUpSuccess: () => void
  loading:boolean
  isVisible:boolean
  onClose:()=>void
  handleTopUpSuccess:()=>void
}

const TopUpModal = ({
  userData, 
  getUserDetails, 
  topUp, 
  topUpSuccess,
  loading,
  isVisible,
  onClose,
  handleTopUpSuccess
}:TopUpModalProps) => {
  const [topUpData, setTopUpData] = useState<IPaymentRequest>({
      amount:0,
      description:"",
      type:"credit",
      userId:0,
  })

  const handleChangeTopUpData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key:string) => {
    if(key === "amount"){
        setTopUpData({...topUpData, [key]:parseInt(e.target.value)})
    } else {
        setTopUpData({...topUpData, [key]:e.target.value})
    }
  }

  const handleSubmitTopUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    topUp({...topUpData, userId:userData?.id as number}, userData!, userData.balance + topUpData.amount)
    getUserDetails()
    setTimeout(() => {
      getUserDetails()
      topUpSuccess();
      handleTopUpSuccess();
      setTopUpData({...topUpData, amount:0})
    },3000)
  }  
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className='flex flex-col'>
          <div className="flex flex-col justify-center items-center md:pt-[50px]">
              <div className='TopUpPageWrapper md:w-[500px] flex-1 flex flex-col justify-center items-center h-full w-full'>
                  <TopUpPageHeading balance={userData?.balance!} />
                  <div className='TopUpForm flex flex-col justify-center items-center p-6'>
                      <form className='TopUpFormWrapper flex flex-col gap-[20px]' onSubmit={(e)=>handleSubmitTopUp(e)}>
                          <h1 className='TopUpFormInputText font-light text-[16px]'>How much would you like to top up?</h1>
                          <div className='CurrencyAmountWrapper flex flex-row items-center justify-center'>
                              <div className='w-[40px] h-[46px] bg-white  flex justify-center items-center rounded-l-md p-1'><p>Rp</p></div>
                              <Input 
                                  required
                                  min={1}
                                  type="number"
                                  id='amount'
                                  value={topUpData.amount}
                                  onChange={(e)=>handleChangeTopUpData(e, "amount")}
                                  className='topup' 
                                  />
                          </div>
                          <TextArea 
                              label='description' 
                              onChange={(e)=>handleChangeTopUpData(e, "description")}
                              value={topUpData.description}
                              required />
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
                              <Button disabled={loading} active loading={loading} label='Top Up' type='submit'/>
                              }
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </Modal>
  )
}

type TopUpPageHeadingProps = {
  balance:number
}

const TopUpPageHeading = ({balance}:TopUpPageHeadingProps) => {
  return(   
      <div className='TopUpPageHeading flex flex-col justify-center items-center border-b-[1px] border-primaryBlue w-full p-3'>
          <h1 className='text-light text-[16px]'>Current Balance</h1>
          <h1 className='text-[36px] font-bold text-primaryBlue'>{Utils.convertPrice(balance)}</h1>
      </div>
  )
}

export default TopUpModal