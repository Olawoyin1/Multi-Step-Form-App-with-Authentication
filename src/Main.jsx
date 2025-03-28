import React, { useState } from "react";
import Success from "./Components/Home";
import UserDetails from "./Components/UserDetails";
import Verification from "./Components/Verification";
import Password from "./Components/Password";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Loading from "./Components/Loading";
import { Link } from "react-router-dom";

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
    phonenumber: "",
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
    otp: Yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
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
          response = await verifyOtp(values.email, values.otp, setErrors);
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
      const response = await axios.post("http://localhost:8000/send-otp/", values);
      toast.success(response.data.message);
      return { error: false }; // ✅ No error, proceed
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors({ email: error.response.data.email || "Email is invalid" });
      } else {
        toast.error("Something went wrong. Try again.");
      }
      return { error: true }; // ❌ Error, don't proceed
    } finally {
      setLoading(false);
    }
  };
  
  

  const verifyOtp = async (email, otp, setErrors) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/verify-otp/", { email, otp });
      toast.success(response.data);
      return { error: false };
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors({ otp: error.response.data.otp || "Invalid OTP" });
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
      const response = await axios.post("http://localhost:8000/register/", values);
      toast.success(response.data);
      return { error: false };
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data);
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
      const response = axios.post("http://localhost:8000/resend-otp/", values)
      toast.success(response.data)
      
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
        <div className="sign row m-0">
          <div className="img-side col-6 m-0 p-0">
            <img src="../Images/bg3.jpg" alt="" />
          </div>
          <div className="form-side position-relative col-6 m-0 d-flex align-items-center justify-content-center p-0">
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
                  {step === 2 && <Verification resendOTP={resendOTP} formik={formik} />}
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
