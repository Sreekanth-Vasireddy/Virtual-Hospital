import React, { Fragment } from "react";
import { deletePrescription } from "../../db/ops/authOps";

function Prescription({ prescription }) {
  return (
    <Fragment>
      <div className="col-sm-12 col-lg-6 col-xl-3">
        <div className="mw-full">
          <div className="card  p-0 m-10">
            <div className="px-card py-10 border-bottom">
              <h2 className="card-title font-size-18 m-0">
                {prescription.pharmacyName}
              </h2>
            </div>

            <div className="content m-10">
              <div>{`Upload On: ${prescription.uploadedOn}`}</div>
              <hr />
              <div>{prescription.pharmacyId}</div>
              <hr />
              <div>{prescription.pharmacyPhone}</div>
              <hr />
              <div>
                <i
                  style={{ color: "red" }}
                  className="fa fa-map-marker-alt mr-5"
                  aria-hidden="true"
                ></i>
                {prescription.pharmacyAddress}
              </div>
              <hr />

              <div className="form-inline">
                <div className="form-group mb-0">
                  <button className="btn btn-secondary btn-sm">
                    <a
                      href={prescription.downloadUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Downlod
                    </a>
                  </button>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => deletePrescription(prescription.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Prescription;
