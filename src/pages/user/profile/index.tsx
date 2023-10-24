import { useUser } from '@/store/user/useUser'
import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar/Navbar'
import styles from './Profile.module.scss'
import { Utils } from '@/utils'
import { useRouter } from 'next/router'

const Profile = () => {
    const userData = useUser.use.userData()
    const getUserDetails = useUser.use.getUserDetails()
    const router = useRouter()
    const [editName, setEditName] = useState<boolean>(false)

    useEffect(()=>{
        getUserDetails()
        console.log(userData)
    },[])

    return (
        <>
            <Navbar />
            <div className='flex flex-col justify-center items-center pt-[60px] md:pt-[100px] w-full gap-1 bg-lightGrey rounded-lg'>
                <div className={styles.Profile}>
                    <div className={styles.ProfileHeading}>
                        <p className='text-white text-[14px] text-left font-bold'>{`${userData.firstName} ${userData.lastName}`}</p>
                    </div>
                    <div className='BalanceWrapper flex flex-row justify-between px-4 pb-6 pt-[40px]'>
                        <div className='flex flex-col'>
                            <p className='BalanceText text-secondaryText'>Balance</p>
                            <p className='BalanceText font-bold text-secondaryText text-[20px]'>{Utils.convertPrice(userData.balance)}</p>
                        </div>
                        <button 
                        className='border-[1px] bg-primaryBlue w-[100px] rounded-lg text-[14px] text-white font-bold'
                        onClick={()=>router.push("/user/topup")}>
                            Top Up
                        </button>
                    </div>
                    <div className='LoyaltyWrapper bg-white w-[90vw] md:w-[300px] px-3 py-2 absolute top-[60px] shadow-md left-[20px] rounded-lg'>
                        <div className='relative'>
                            <div className='LoyaltyInfo  h-[50px] md:w-[300px]'>
                                <p className='text-secondaryText font-bold text-[12px]'>LOYALTY</p>
                                <p className='text-secondaryText font-bold'>{userData.membership}</p>
                                <button className='bg-white border-[1px] border-primaryBlue p-2 rounded-lg text-primaryBlue right-1 absolute top-1 text-[12px] font-bold hover:shadow-TicketCardSmall'>
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile