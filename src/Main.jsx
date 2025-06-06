import React, { useState } from "react";
import UserDetails from "./Components/UserDetails";
import Verification from "./Components/Verification";
import Password from "./Components/Password";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Loading from "./Components/Loading";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [active, isActive] = useState(false);

  const navigate = useNavigate()

  const steps = [
    { number: 1, label: "User Details" },
    { number: 2, label: "Verification" },
    { number: 3, label: "Password Setup" },
  ];

  const initialValues = {
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    phonenumber: "",
    dob: "",
    gender: "",
    otp_code: "",
    password: "",
    confirmPassword: "",
  };

  // Validation Schemas for Each Step
  const PasswordValidation = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const UserinfoValidation = Yup.object().shape({
    first_name: Yup.string().required("Firstname is required"),
    last_name: Yup.string().required("Lastname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phonenumber: Yup.string().required("Phone number is required"),
    dob: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const OTPValidation = Yup.object().shape({
    otp_code: Yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
  });




  const formik = useFormik({
    initialValues,
    validationSchema: step === 1 ? UserinfoValidation : step === 2 ? OTPValidation : PasswordValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        let response;
        if (step === 1) {
          response = await sendOtp(values, setErrors);
        } else if (step === 2) {
          response = await verifyOtp(values, setErrors);
        } else if (step === 3) {
          response = await registerUser(values, setErrors);
        }
  
        // ✅ Only move to the next step if no errors exist
        if (!response.error) {
          setStep((prev) => prev + 1);
        }
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        setErrors(error.response?.data || { general: "Something went wrong" });
      } finally {
        setSubmitting(false);
      }
    },
  });
  




  const sendOtp = async (values, setErrors) => {
    setLoading(true);
    try {
      const response = await axios.post("https://olawoyin-multistepform.onrender.com/send-otp/", values);
      toast.success(response.data.message);
      isActive(true)
      return { error: false }; // ✅ No error, proceed
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors({ email: error.response.data.message || "Email is invalid" });
        console.log(error.response)
      } else {
        toast.error("Something went wrong. Try again.");
      }
      return { error: true }; 
    } finally {
      setLoading(false);
    }
  };
  
  

  const verifyOtp = async (values, setErrors) => {
    console.log(values)
    setLoading(true);
    try {
      const response = await axios.post("https://olawoyin-multistepform.onrender.com/verify-otp/", values);
      toast.success(response.data.message);
      return { error: false };
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors({ otp_code: error.response.data.error || "Invalid OTP" });
        console.log(error.response.data.error)
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
      return { error: true };
    } finally {
      setLoading(false);
    }
  };
  
  
  const registerUser = async (values, setErrors) => {
    setLoading(true);
    try {
      const response = await axios.post("https://olawoyin-multistepform.onrender.com/register/", values);
      toast.success(response.data.message);
      navigate('/login')
      
      return { error: false };
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data.error);
      } else {
        setErrors({ general: "Registration failed. Try again." });
      }
      return { error: true };
    } finally {
      setLoading(false);
    }
  };
  
  


  const resendOTP = async(values)=>{
    console.log("sending OTP agian please hold")
    setLoading(true)
    console.log(values)
    try {
      const response = axios.post("https://olawoyin-multistepform.onrender.com/resend-otp/", values)
      toast.success(response.data.message)
      
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }finally{
      setLoading(false)

    }
  }




  
  // Function to handle previous step
  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div>
      <div className="">
        <div className="sign d-flex flex-lg-row flex-column-reverse m-0">
          <div className="img-side col m-0 p-0">
            <img src="../Images/bg3.jpg" alt="" />
          </div>
          <div className="form-side col m-0 d-flex align-items-center justify-content-center p-0">
            {loading && <Loading />}

            <div className="form-container rounded p-4">
              {/* Step Indicator */}
              <div className="steps grid mb-3 gap-3">
                {steps.map((item) => (
                  <div
                    key={item.number}
                    className={item.number <= step ? "each rounded active" : "each rounded"}
                  ></div>
                ))}
              </div>

              <form onSubmit={formik.handleSubmit} className="form-contents">
                {/* Form Content */}
                <div className="form-contents">
                  {step === 1 && <UserDetails formik={formik} />}
                  {step === 2 && <Verification resendOTP={resendOTP} isActive={isActive} formik={formik} />}
                  {step === 3 && <Password formik={formik} />}
                </div>

                {/* CTA Buttons */}
                <div className="cta d-flex align-items-center justify-content-between">
                  {/* Skip Button */}
                  {step === 1 && (
                    <div>
                      <small>Already have an Account? <Link to="/login">Login</Link></small>
                    </div>
                  )}

                  {/* Go Back Button */}
                  {step > 1 && (
                    <button
                      type="button"
                      className="bg-secondary text-white p-2 px-4"
                      onClick={handlePrev}
                    >
                      Go Back
                    </button>
                  )}

                  {/* Next or Submit Button */}
                  <button
                    type="submit"
                    className="bg-primary text-white px-5 py-2"
                    disabled={loading}
                  >
                    {step === steps.length ? "Submit" : "Continue"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
