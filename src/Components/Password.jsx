import React from 'react'

const Password = () => {
  return (
    <div className='mt-5'>
        <p>Secure Your Account</p>
        <small>Create a strong password to protect your account.</small>
        <form action="" className='mt-4 d-flex flex-column gap-3'>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password' />
          </div>

          <div className="input-field">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" placeholder='Confirm Password' />
          </div>


        </form>
    </div>
  )
}

export default Password