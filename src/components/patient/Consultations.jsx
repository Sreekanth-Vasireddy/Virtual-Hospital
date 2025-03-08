import React, { Fragment, useEffect, useState } from "react";
import Consultation from "./Consultation";

function Consultations({ uid, consultations }) {
  const [consults, setConsults] = useState([]);
  useEffect(() => {
    let patientConsults = [];
    consultations.forEach((element) => {
      if (uid === element.patientId) {
        patientConsults.push(element);
      }
    });
    setConsults(patientConsults);
  }, [consultations, uid]);

  return (
    <Fragment>
      <div className="row row-eq-spacing-sm">
        {consults.length > 0 ? (
          consults.map((item, i) => {
            return (
              <div key={i} className="col-sm-12 col-lg-6 col-xl-3">
                <Consultation
                  consultation={item}
                  consultations={consultations}
                />
              </div>
            );
          })
        ) : (
          <h5>No Consultations Found</h5>
        )}
      </div>
    </Fragment>
  );
}

export default Consultations;
