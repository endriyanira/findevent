import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
import "react-toastify/dist/ReactToastify.css";

const DotsLoading = () => {
  return (
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
  )
}

export default DotsLoading
