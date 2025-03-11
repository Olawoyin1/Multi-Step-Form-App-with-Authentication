import React, { useState } from "react";
import Success from "./Components/Success";
import UserDetails from "./Components/UserDetails";
import Verification from "./Components/Verification";
import Password from "./Components/Password";
import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "./Components/Loading";

const Main = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); 

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
    phoneNumber: "",
    dob: "",
    gender: "",
    otp: "",
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
    })


  const UserinfoValidation = Yup.object().shape({
    first_name: Yup.string().required("Firstname is required"),
    last_name: Yup.string().required("Lastname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    dob: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
  })

  const OTPValidation = Yup.object().shape({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .required("OTP is required"),
  })


  


  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: step === 1 ? UserinfoValidation : step === 2 ? OTPValidation : PasswordValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values)
      try {
        if (step === 1) {
          await sendOtp(values);
        } else if (step === 2) {
          await verifyOtp(values.email, values.otp);
        } else if (step === 3) {
          await registerUser(values);
        }
        if (step < steps.length) setStep(step + 1);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
      }
    },
  });


   // **Send OTP**
   const sendOtp = async (values) => {
    console.log("Sending request...")
    const response = await axios.post("http://localhost:8000/send-otp/", values);
    console.log("OTP Sent:", response.data);
  };

  // **Verify OTP**
  const verifyOtp = async (email, otp) => {
    const response = await axios.post("http://localhost:8000/verify-otp", { email, otp });
    console.log("OTP Verified:", response.data);
  };

  // **Register User**
  const registerUser = async (values) => {
    const response = await axios.post("http://localhost:8000/register", values);
    console.log("User Registered:", response.data);
  };



  

  // Function to handle previous step
  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };




  


  return (
    <div>
      <div className="">
        <div className="sign row m-0">
          <div className="img-side col-6 m-0 p-0">
            <img src="../Images/bg3.jpg" alt="" />
          </div>
          <div className="form-side col-6 m-0 d-flex align-items-center justify-content-center p-0">
            {
              loading && <Loading />
            }


            <div className="form-container  rounded p-4">
                  {/* Step Indicator (Hidden on Success Page) */}
                  <div className="steps grid mb-3 gap-3">
                    {steps.map((item) => (
                      <div
                        key={item.number}
                        className={
                          item.number <= step
                            ? "each rounded active"
                            : "each rounded"
                        }
                      ></div>
                    ))}
                  </div>

                  <form onSubmit={formik.handleSubmit} className="form-contents">

                  

                    {/* Form Content */}
                    <div className="form-contents">
                      {step === 1 && <UserDetails formik={formik}/>}
                      {step === 2 && <Verification formik={formik}/>}
                      {step === 3 && <Password formik={formik}/>}
                    </div>

                    {/* CTA Buttons (Hidden on Success Page) */}
                    <div className="cta d-flex justify-content-between gap-2">
                      {/* Skip Button (Only on Step 1) */}
                      {step === 1 && (
                        <button
                          type="button"
                          className="bg-light text-dark rounded p-2 px-4"
                          // onClick={handleNext}
                        >
                          Skip For Now
                        </button>
                      )}

                      {/* Go Back Button (Step 2 & Above) */}
                      {step > 1 && (
                        <button
                          type="button"
                          className="bg-secondary text-white rounded p-2 px-4"
                          onClick={handlePrev}
                        >
                          Go Back
                        </button>
                      )}

                      {/* Next or Submit Button */}
                      <button
                        type="submit"
                        className="bg-primary text-white px-5 py-2 rounded"
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
