import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Navbar from '@/components/Navbar/Navbar'
import TextArea from '@/components/TextArea/TextArea'
import React, { useEffect, useState } from 'react'
import { useUser } from '@/store/user/useUser'
import { IPaymentRequest } from '@/interfaces/payments'
import { Utils } from '@/utils'
import { ToastContainer, ToastContent, TypeOptions, toast } from 'react-toastify'
import { UserData } from '@/interfaces/user'
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner"; 

const TopUp = () => {
    const userData = useUser.use.userData();
    const getUserDetails = useUser.use.getUserDetails();
    const topUp = useUser.use.topUp()
    const topUpSuccess = useUser.use.topUpSuccess();
    const loading = useUser.use.loading();
    const [topUpData, setTopUpData] = useState<IPaymentRequest>({
        amount:0,
        description:"",
        type:"credit",
        userId:0,
    })

    const notify = (message: ToastContent, type: TypeOptions) => {
        toast(message, {
          type: type,
          position: toast.POSITION.TOP_RIGHT,
        });
      };
    

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
            notify("Top Up Success" as ToastContent, "success");
            getUserDetails()
            topUpSuccess();
        },3000)
    }

    useEffect(()=>{
        getUserDetails()
    },[])

  return (
    <div className='flex flex-col min-h-screen'>
        <ToastContainer />
        <Navbar />
        <div className="flex flex-col justify-center items-center pt-4 md:pt-[50px]">
            <div className='TopUpPageWrapper md:w-[500px] flex-1 flex flex-col justify-center items-center h-full w-full pt-[64px]'>
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
                                placeholder={`${topUpData.amount === 0 && "amount"}`}
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
  )
}

type TopUpPageHeadingProps = {
    balance:number
}

const TopUpPageHeading = ({balance}:TopUpPageHeadingProps) => {
    return(   
        <div className='TopUpPageHeading flex flex-col justify-center items-center border-b-[1px] h-full border-primaryBlue w-full p-3'>
            <h1 className='text-light text-[16px]'>Current Balance</h1>
            <h1 className='text-[36px] font-bold text-primaryBlue'>{Utils.convertPrice(balance)}</h1>
        </div>
    )
}

export default TopUp
