import React, { useState } from "react";
import Success from "./Components/Success";
import UserDetails from "./Components/UserDetails";
import Verification from "./Components/Verification";
import Password from "./Components/Password";

const Main = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false); // Track submission

  const steps = [
    { number: 1, label: "User Details" },
    { number: 2, label: "Verification" },
    { number: 3, label: "Password Setup" },
    // { number: 4, label: "Summary" },
  ];

  // Function to handle next step
  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      setSubmitted(true); // Show success page after submission
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

                  {/* Form Content */}
                  <div className="form-contents">
                    {step === 1 && <UserDetails />}
                    {step === 2 && <Verification />}
                    {step === 3 && <Password />}
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
                      type="button"
                      className="bg-primary text-white px-5 py-2 rounded"
                      onClick={handleNext}
                    >
                      {step === steps.length ? "Submit" : "Continue"}
                    </button>
                  </div>
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
