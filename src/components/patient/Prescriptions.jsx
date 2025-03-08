import React, { Fragment } from "react";
import { GetPrescriptions } from "../../db/hooks/authHooks";
import Prescription from "./Prescription";

function Prescriptions({ uid }) {
  const patientPrescritions = GetPrescriptions(uid);

  return (
    <Fragment>
      <div className="row row-eq-spacing-sm">
        {patientPrescritions.length > 0 ? (
          patientPrescritions.map((prescription, i) => {
            return <Prescription key={i} prescription={prescription} />;
          })
        ) : (
          <h5>No Prescriptions available</h5>
        )}
      </div>
    </Fragment>
  );
}

export default Prescriptions;
