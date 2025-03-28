import React from 'react'

const Verification = ({ formik, resendOTP }) => {
  return (
    <div className='mt-4'>
      <p>Verify Your Identity</p>
      <small>We've sent a One-Time Password (OTP) to your email. Enter it below to continue</small>
      <div className='mt-4'>
        <div className="input-field">
          <label htmlFor="Enter OTP">Enter OTP</label>
          <input type="text" placeholder='890123' {...formik.getFieldProps("otp")} />

          {formik.touched.otp && formik.errors.otp && (
            <small className="error">{formik.errors.otp}</small>
          )}

        </div>
        
        <button className='btn btn-dark rounded-0 mt-3' onClick={()=>resendOTP(formik.values)}>Resend OTP</button>
      </div>
    </div>
  )
}

export default Verification