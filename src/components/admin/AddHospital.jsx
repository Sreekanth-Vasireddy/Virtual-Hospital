import React, { Fragment, useState } from "react";
import { addHospital } from "../../db/ops/authOps";

function AddHospital() {
  const initState = {
    name: "",
    address: "",
  };
  const [hospitalState, setHospitalState] = useState(initState);
  const handleChange = (e) => {
    setHospitalState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addHospital(hospitalState);
    setHospitalState(initState);
  };
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="mt-20"></div>
        <div className="row">
          <div className="col"></div>
          <div className="col-8 col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="required">Hospital Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  pattern="[A-Za-z\s]{3,}"
                  title="3 or more Alphabets"
                  placeholder="Enter Name"
                  required="required"
                  value={hospitalState.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="required">Hospital Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  pattern="[A-Za-z\s,-]{3,}"
                  title="3 or more Alphabets with ',' & '-'"
                  placeholder="Enter Address"
                  required="required"
                  value={hospitalState.address}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-danger btn-sm" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddHospital;
