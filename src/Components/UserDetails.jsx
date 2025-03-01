import React from "react";

const UserDetails = () => {

  const gender = [
    "male",
    "female",
  ]


  return (
    <div>
      <div className="s-header text-center d-flex flex-column gap-1">
        <p className="fw-bold">
        Personal Information 
        </p>
        <small className="text-muted">
        Tell us a bit about yourself to get started.
        </small>
      </div>

      
      <form action="" className="so-form my-3 d-flex flex-column gap-2">

        <div className="grid2 gap-2">
            {/* Institution Selection */}
            <div className="input-field">
            <label htmlFor="institution">First Name</label>
            
              <input placeholder="Firstname" type="text" />
            </div>

            {/* Academic Level Selection */}
            <div className="input-field">
            <label htmlFor="level">Last Name</label>
            <input type="text" placeholder="Lastname" />
            </div>
        </div>

        {/* Field of Study & GPA */}
        <div className="input-field">
        <label htmlFor="fieldOfStudy">Email Address</label>
        <input type="email" id="email" placeholder="Email " />
        </div>

        <div className="input-field">
        <label htmlFor="gpa">Phone Number</label>
        <input type="text" id="gpa" placeholder="Phone Number" />
        </div>

        {/* Interests Selection */}
        <div className="input-field">
          <label htmlFor="interest">Date Of Birth</label>
          <input type="date" name="" id="" />
        </div>

        <div className="input-field">
        <label htmlFor="gender">Gender</label>
        <select id="gender">
            <option value="">Select Gender</option>
            {gender.map((interest, index) => (
              <option key={index} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </div>

      </form>
    </div>
  );
};

export default UserDetails
;
