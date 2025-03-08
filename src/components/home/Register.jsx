import React, { Fragment, useState } from "react";
import { registerUser, sendDocRequest } from "../../db/ops/authOps";

function Register({ hospitals }) {
  const initState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    hospital: "",
    specialization: "",
    err: "",
    dob: "",
    medicare: "",
    mobile: "",
    address: "",
  };

  const [isDoc, setIsDoc] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerState, setRegisterState] = useState(initState);

  const handleRoleChange = (e) => {
    e.target.value === "Doctor" ? setIsDoc(true) : setIsDoc(false);
    e.target.value === "Patient" ? setIsPatient(true) : setIsPatient(false);
  };

  const handleChange = (e) => {
    setRegisterState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterState(initState);
    setIsDoc(false);
    setIsPatient(false);
    setLoading(true);
    if (registerState.role === "Doctor") {
      await sendDocRequest(registerState);
    } else {
      await registerUser(registerState);
    }
    setLoading(false);
    console.log(registerState);
  };

  return (
    <div className="container-fluid">
      
      <div className="mt-20"></div>
      <div className="row">
        <div className="col"></div>
        <div className="col-8 col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="required">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                pattern="[A-Za-z]{3,}"
                title="3 or More letters"
                placeholder="Enter First Name"
                required="required"
                value={registerState.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="required">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                pattern="[A-Za-z]{3,}"
                title="3 or More letters"
                placeholder="Enter Last Name"
                required="required"
                value={registerState.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="required">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Email"
                required="required"
                value={registerState.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="required">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                required="required"
                value={registerState.dob}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="required">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                placeholder="Enter Password"
                required="required"
                value={registerState.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="required" htmlFor="registeras">
                Register As
              </label>
              <select
                className="form-control"
                id="registeras"
                name="role"
                required="required"
                value={registerState.role}
                onChange={(e) => {
                  handleChange(e);
                  handleRoleChange(e);
                }}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Doctor">Doctor</option>
                <option value="Patient">Patient</option>
              </select>
            </div>

            {isPatient && (
              <Fragment>
                <div className="form-group">
                  <label className="required">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    pattern="\+61[0-9]{9}"
                    title="Start with +61 and 9 digits after"
                    placeholder="Enter Mobile Number"
                    required="required"
                    value={registerState.mobile}
                    onChange={handleChange}
                  />
                  {/* <div className="invalid-feedback">Not a valid Email</div> */}
                </div>
                <div className="form-group">
                  <label className="required">Medicare Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="medicare"
                    name="medicare"
                    pattern="[0-9]{10}"
                    title="Must be a 10 digit Number"
                    placeholder="Enter Medicare Number"
                    required="required"
                    value={registerState.medicare}
                    onChange={handleChange}
                  />
                  {/* <div className="invalid-feedback">Not a valid Email</div> */}
                </div>
                <div className="form-group">
                  <label className="required">Address</label>
                  <textarea
                    className="form-control form-control-sm"
                    placeholder="Enter Unit Number, Street Name, Suburb, Pincode"
                    value={registerState.address}
                    name="address"
                    onChange={handleChange}
                    required
                  ></textarea>
                  {/* <div className="invalid-feedback">Not a valid Email</div> */}
                </div>
              </Fragment>
            )}

            {isDoc && (
              <div className="form-group">
                <label className="required" htmlFor="hospitals">
                  Hospital
                </label>
                <select
                  className="form-control"
                  id="hospitals"
                  name="hospital"
                  required="required"
                  value={registerState.hospital}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Hospital
                  </option>
                  {hospitals.map((hospital, i) => (
                    <option key={i} value={hospital.name}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {isDoc && (
              <div className="form-group">
                <label className="required" htmlFor="specialization">
                  Specialization
                </label>
                <select
                  className="form-control"
                  id="specialization"
                  name="specialization"
                  required="required"
                  value={registerState.specialization}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Specialization
                  </option>
                  <option value="Physician">Physician</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Dentist">Dentist</option>
                </select>
              </div>
            )}

            <button
              className="btn btn-danger btn-sm"
              type="submit"
              disabled={loading}
            >
              Register
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default Register;
