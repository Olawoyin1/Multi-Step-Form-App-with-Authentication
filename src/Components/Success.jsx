import React from 'react'
import { GoGift } from "react-icons/go";

const Success = () => {
  return (
    <div className='d-flex align-items-center justify-content-center text-center flex-column gap-3 h-100 p-2 pt-4'>
        <img src="../Images/done.png" alt="" />
        <p className='fw-bold'>Congratulations</p>
        <small>You've earned 1000 WESPoints</small>
        <div className='color-bg text-primary p-3 text-center d-flex flex-column gap-2 rounded border-white'>
          <p className='fw-bold'><GoGift /> Your Rewards</p>
          <p className='fw-bold'>2000 WESPoints Unlocked</p>
          <small>Want to know your employability status? Take the ESA with your 2000 WESPoints to get started!</small>
          <button className='btn-primary btn '>Take Esa</button>
        </div>
    </div>
  )
}

export default Success