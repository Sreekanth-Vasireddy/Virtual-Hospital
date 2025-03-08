import React, { useState } from "react";
import { updatePatientMedicalRecord } from "../../db/ops/authOps";

function PatientRecord({ patient }) {
  const initState = {
    bp: patient.medicalRecords.bp,
    sugar: patient.medicalRecords.sugar,
    temperature: patient.medicalRecords.temperature,
  };
  const [patientRecord, setPatientRecord] = useState(initState);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      patientRecord.temperature.length > 0 &&
      patientRecord.bp.length > 0 &&
      patientRecord.sugar.length > 0
    ) {
      await updatePatientMedicalRecord(patient.id, patientRecord);
      setEditing(false);
    } else {
      setPatientRecord(initState);
    }
  };

  const handleChange = (e) => {
    setPatientRecord((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="mw-full">
      <div className="card  p-0">
        <div className="px-card py-10 border-bottom">
          <h2 className="card-title font-size-18 m-0">{patient.fullName}</h2>
        </div>

        <div className="content m-10">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="bp">BP</label>
              <input
                className="form-control form-control-sm"
                id="bp"
                name="bp"
                value={patientRecord.bp}
                readOnly={!editing}
                onChange={handleChange}
              />
            </div>
          </form>
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="sugar">Sugar</label>
              <input
                className="form-control form-control-sm"
                id="sugar"
                name="sugar"
                value={patientRecord.sugar}
                readOnly={!editing}
                onChange={handleChange}
              />
            </div>
          </form>
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="temp">Temperature</label>
              <input
                className="form-control form-control-sm"
                id="temp"
                name="temperature"
                value={patientRecord.temperature}
                onChange={handleChange}
                readOnly={!editing}
              />
            </div>
          </form>
          <form className="form-inline">
            <div className="form-group mb-10">
              {!editing && (
                <button className="btn btn-danger" onClick={handleEdit}>
                  Edit
                </button>
              )}
              {editing && (
                <>
                  <button className="btn btn-success" onClick={handleSubmit}>
                    Submit
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientRecord;
