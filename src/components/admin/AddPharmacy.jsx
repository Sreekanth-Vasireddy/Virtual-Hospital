import React, { Fragment, useState } from "react";
import { addPharmacy } from "../../db/ops/authOps";

function AddPharmacy() {
  const initState = {
    name: "",
    storeId: "",
    address: "",
    phone: "",
  };
  const [pharmacyState, setPharmacyState] = useState(initState);
  const handleChange = (e) => {
    setPharmacyState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addPharmacy(pharmacyState);
    setPharmacyState(initState);
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
                <label className="required">Pharmacy Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  pattern="[A-Za-z\s]{3,}"
                  title="3 or more Alphabets"
                  placeholder="Enter Name"
                  required="required"
                  value={pharmacyState.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="required">Pharmacy Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="storeId"
                  name="storeId"
                  pattern="[0-9]{6}"
                  title="6 digit number"
                  placeholder="Enter Address"
                  required="required"
                  value={pharmacyState.storeId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="required">Pharmacy Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  pattern="[A-Za-z\s,-]{3,}"
                  title="3 or more Alphabets with ',' & '-'"
                  placeholder="Enter Address"
                  required="required"
                  value={pharmacyState.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="required">Pharmacy Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  pattern="\+61[0-9]{9}"
                  title="Start with +61 and 9 digits after"
                  placeholder="Enter Address"
                  required="required"
                  value={pharmacyState.phone}
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

export default AddPharmacy;
