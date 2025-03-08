import React, { useEffect, useState, Fragment } from "react";
import PatientRecord from "./PatientRecord";

function PatientRecords({ users }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    let patientUsers = [];
    users.forEach((user) => {
      if (user.role === "Patient") {
        patientUsers.push(user);
      }
    });
    setPatients(patientUsers);
  }, [users]);

  return (
    <Fragment>
      {patients.length > 0 ? (
        <div className="row row-eq-spacing-sm">
          {patients.map((item, i) => {
            return (
              <div key={i} className="col-sm-12 col-lg-6 col-xl-3">
                <PatientRecord patient={item} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Patients found</div>
      )}
    </Fragment>
  );
}

export default PatientRecords;
