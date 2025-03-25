import React from 'react'

const Login = () => {
  return (
    <div>
      <div className="row m-0">
        <div className="col-6 d-flex align-items-center justify-content-center">
          <div className="form-container d-flex align-items-center justify-content-center rounded p-4">
              <form action="" className='d-flex  flex-column gap-3 w-100'>
                  <div className="s-header text-center d-flex flex-column gap-1">
                    <p className="fw-bold">Personal Information</p>
                    <small className="text-muted">
                      Tell us a bit about yourself to get started.
                    </small>
                  </div>

                  <div className="input-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      // {...formik.getFieldProps("email")}
                    />
                    {/* {formik.touched.email && formik.errors.email && (
                      <small className="error">{formik.errors.email}</small>
                    )} */}
                  </div>

                  <div className="input-field">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      // {...formik.getFieldProps("password")}
                    />
                    {/* {formik.touched.password && formik.errors.password && (
                      <small className="error">{formik.errors.password}</small>
                    )} */}
                  </div>

                  <button type="submit"
                        className="bg-primary d-inline-block w-50 align-items-start text-white px-5 py-2 rounded">Login</button>
              </form>
          </div>
        </div>
          
        <div className="img-side col-6 m-0 p-0">
          <img src="../Images/log.jpg" alt="" />
        </div>
        
      </div>
    </div>
  )
}

export default Login