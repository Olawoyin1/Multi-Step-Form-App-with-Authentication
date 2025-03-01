import React from 'react'

const Verification = () => {
  return (
    <div className='mt-4'>
      <p>Verify Your Identity</p>
      <small>We've sent a One-Time Password (OTP) to your email. Enter it below to continue</small>
      <form action="" className='mt-4'>
        <div className="input-field">
          <label htmlFor="Enter OTP">Enter OTP</label>
          <input type="text" placeholder='890123' />
        </div>
        
        <button className='btn btn-dark rounded-0 mt-3'>Resend OTP</button>
      </form>
    </div>
  )
}

export default Verification