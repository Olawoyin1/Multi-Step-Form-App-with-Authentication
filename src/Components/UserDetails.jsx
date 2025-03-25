import React from "react";

const UserDetails = ({ formik }) => {
  const genderOptions = ["male", "female"];

  return (
    <div>
      <div className="s-header text-center d-flex flex-column gap-1">
        <p className="fw-bold">Personal Information</p>
        <small className="text-muted">
          Tell us a bit about yourself to get started.
        </small>
      </div>

      <div className="so-form my-3 d-flex flex-column gap-2">
        <div className="grid2 gap-2">
          <div className="input-field">
            <label>Firstname</label>
            <input
              type="text"
              placeholder="Firstname"
              {...formik.getFieldProps("first_name")}
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <small className="error">
                {formik.errors.first_name}
              </small>
            )}
          </div>

          <div className="input-field">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Lastname"
              {...formik.getFieldProps("last_name")}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <small className="error">{formik.errors.last_name}</small>
            )}
          </div>
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
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            {...formik.getFieldProps("phonenumber")}
          />
          {formik.touched.phonenumber && formik.errors.phonenumber && (
            <small className="error">{formik.errors.phonenumber}</small>
          )}
        </div>

        <div className="input-field">
          <label>Date Of Birth</label>
          <input type="date" name="dob" {...formik.getFieldProps("dob")} />
          {formik.touched.dob && formik.errors.dob && (
            <small className="error">{formik.errors.dob}</small>
          )}
        </div>

        <div className="input-field">
          <label>Gender</label>
          <select name="gender" {...formik.getFieldProps("gender")}>
            <option value="">Select Gender</option>
            {genderOptions.map((g, index) => (
              <option key={index} value={g}>
                {g}
              </option>
            ))}
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <small className="error">{formik.errors.gender}</small>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
