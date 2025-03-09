import React, { useState } from "react";
import Success from "./Components/Success";
import UserDetails from "./Components/UserDetails";
import Verification from "./Components/Verification";
import Password from "./Components/Password";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";

const Main = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false); // Track submission

  const steps = [
    { number: 1, label: "User Details" },
    { number: 2, label: "Verification" },
    { number: 3, label: "Password Setup" },
  ];

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    dob: "",
    gender: "",
    otp: "",
    password: "",
    confirmPassword: "",
  };

  // Validation Schemas for Each Step
  const validationSchemas = [
    Yup.object().shape({
      firstName: Yup.string().required("Firstname is required"),
      lastName: Yup.string().required("Lastname is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      dob: Yup.string().required("Date of birth is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    Yup.object().shape({
      otp: Yup.string()
        .length(6, "OTP must be 6 digits")
        .required("OTP is required"),
    }),
    Yup.object().shape({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
  ];

  // Formik Hook
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemas[step - 1],
    onSubmit: (values) => {
      if (step < steps.length) {
        setStep(step + 1);
      } else {
        setSubmitted(true);
      }
    },
  });

  // Function to handle next step
  // const handleNext = () => {
  //   if (step < steps.length) {
  //     setStep(step + 1);
  //   } else {
  //     setSubmitted(true); // Show success page after submission
  //   }
  // };




  const handleNext = async () => {
    const errors = await formik.validateForm(); // Manually trigger validation
    console.log(formik)
  
    if (Object.keys(errors).length === 0) {
      // No validation errors, proceed to next step
      if (step < steps.length) {
        setStep(step + 1);
      } else {
        setSubmitted(true);
      }
    } else {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}),
        true
      );
    }
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
            <div className="form-container  rounded p-4">
              {/* Show Success Page if Submitted */}
              {submitted ? (
                <Success />
              ) : (
                <>
                  {/* Step Indicator (Hidden on Success Page) */}
                  <div className="steps grid mb-3 gap-3">
                    {steps.map((item) => (
                      <div
                        key={item.number}
                        className={
                          step === item.number
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
                        onClick={handleNext}
                      >
                        {step === steps.length ? "Submit" : "Continue"}
                      </button>
                    </div>

                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
