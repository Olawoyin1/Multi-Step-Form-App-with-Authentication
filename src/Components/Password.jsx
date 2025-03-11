import React from 'react'

const Password = ({ formik }) => {
  return (
    <div className='mt-5'>
        <p>Secure Your Account</p>
        <small>Create a strong password to protect your account.</small>
        <div  className='mt-4 d-flex flex-column gap-3'>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password' {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password && (
              <small className="error">{formik.errors.password}</small>
            )}
          </div>

          <div className="input-field">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" placeholder='Confirm Password' {...formik.getFieldProps("confirmPassword")}  />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <small className="error">{formik.errors.confirmPassword}</small>
            )}
          </div>


        </div>
    </div>
  )
}

export default Password