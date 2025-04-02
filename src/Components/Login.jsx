import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { UserContext } from './UserContext';
import toast from 'react-hot-toast';
import Loading from './Loading';

const Login = () => {

  const [loading, setLoading] = useState(false)

  const {setUser} = useContext(UserContext)
  const navigate = useNavigate();

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded);
      return decoded;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
  })

  const onSubmit = async(values) => {
    if(validationSchema){
      setLoading(true)
      try {
        const response = await axios.post(
          "http://localhost:8000/api/token/",
          values
        );
        console.log("Response:", response.data);

        const { access, refresh } = response.data;

        // Store tokens
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        // Decode the access token
        const userInfo = decodeToken(access);
        const id = userInfo.user_id;

        const userDetails = await axios.get(`http://localhost:8000/users/${id}/`)
        setUser(userDetails.data);
        
        setLoading(false);
        navigate("/");
        toast.success("You're Now Logged In.", {
          position: "top-left",
        });


      } catch (error) {
        if (error.response && error.response.data) {
         
          toast.error("Invalid Username or Password", {
            position: "top-left",
          });
          setLoading(false);
          
        } else {
          setLoading(false);
          console.error("Unknown error:", error);
          toast.error(error.message, {
            position: "top-left",
          });
        }
      } finally{
        setLoading(false)
      }
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit
  })


  return (
    <div>
      <div className="row m-0">
        <div className="col col-md-6 form-side  d-flex align-items-center justify-content-center">
        {loading && <Loading />}
          <div className="form-container d-flex align-items-center justify-content-center rounded p-4">
              <form action=""  onSubmit={formik.handleSubmit} className='d-flex  flex-column gap-3 w-100'>
                  <div className="s-header text-center d-flex flex-column gap-1">
                    <h5 className="fw-bold">Login To Study Lab 📚</h5>
                    <small className="text-md-muted text-white">
                    Unlock learning resources and track your progress with ease.
                    </small>
                  </div>
                  
                  <div className="input-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <small className="error">{formik.errors.email}</small>
                    )}
                  </div>

                  <div className="input-field">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <small className="error">{formik.errors.password}</small>
                    )}
                  </div>

                  <div className="switch d-flex align-items-center justify-content-between">
                    <small>Don't Have An Account ? <Link to="/signup">Sign Up</Link></small>
                    <button type="submit" className="bg-primary d-inline-block align-items-start text-white px-4 p-2 ">Login</button>

                  </div>
                    

              </form>
          </div>
        </div>
          
        <div className="img-side col-md-6 m-0 p-0">
          <img src="../Images/log.jpg" alt="" />
        </div>
        
      </div>
    </div>
  )
}

export default Login