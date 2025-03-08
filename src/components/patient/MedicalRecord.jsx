import React from "react";

function MedicalRecord({ patient }) {
  return (
    <div className="container-fluid">
      <div className="mt-20"></div>
      <div className="row">
        <div className="col"></div>
        <div className="col-8 col-lg-6">
          <div className="mw-full">
            <div className="card  p-0">
              <div className="px-card py-10 border-bottom">
                <h2 className="card-title font-size-18 m-0">
                  Patient Medical Record
                </h2>
              </div>

              <div className="content">
                <div>{`BP - ${patient.data.medicalRecords.bp}`}</div>

                <hr />
                <div>{`Sugar - ${patient.data.medicalRecords.sugar}`}</div>
                <hr />
                <div>{`Temperature - ${patient.data.medicalRecords.temperature}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default MedicalRecord;
