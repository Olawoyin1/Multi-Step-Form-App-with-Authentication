import React, { useEffect, useState } from 'react'

const Verification = ({ formik, resendOTP, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes (120 seconds)
  const [isDisabled, setIsDisabled] = useState(true);


  useEffect(() => {
    let timer;

    if (isActive) { // Start timer only when this step is active
      setIsDisabled(true);
      setTimeLeft(120); // Reset timer when step becomes active

      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsDisabled(false); // Enable button when timer reaches 0
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(120); // Reset time when user leaves the step
      setIsDisabled(true);
    }

    return () => clearInterval(timer); // Cleanup when unmounting or switching steps
  }, [isActive]);


  const handleResendOTP = () => {
    resendOTP(formik.values); // Call resend function
    setTimeLeft(120); // Reset timer to 2 minutes
    setIsDisabled(true); // Disable button again
  };

  return (
    <div className='mt-4'>
      <p>Verify Your Identity</p>
      <small>We've sent a One-Time Password (OTP) to your email. Enter it below to continue</small>
      <div className='mt-4'>
        <div className="input-field">
          <label htmlFor="Enter OTP">Enter OTP</label>
          <input type="text" placeholder='890123' {...formik.getFieldProps("otp_code")} />

          {formik.touched.otp_code && formik.errors.otp_code && (
            <small className="error">{formik.errors.otp_code}</small>
          )}

        </div>
        
        <button className='btn btn-dark rounded-0 mt-3'onClick={handleResendOTP} 
          disabled={isDisabled}>{isDisabled ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}</button>
      </div>
    </div>
  )
}

export default Verification