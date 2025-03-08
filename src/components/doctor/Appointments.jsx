import React, { Fragment, useEffect, useState } from "react";
import Appointment from "./Appointment";

function Appointments({ uid, consultations }) {
  const [consults, setConsults] = useState([]);
  useEffect(() => {
    let docConsults = [];
    consultations.forEach((element) => {
      if (uid === element.docId) {
        docConsults.push(element);
      }
    });
    setConsults(docConsults);
  }, [consultations, uid]);

  return (
    <Fragment>
      <div className="row row-eq-spacing-sm">
        {consults.length > 0 ? (
          consults.map((item, i) => {
            return (
              <div key={i} className="col-sm-12 col-lg-6 col-xl-3">
                <Appointment consultation={item} />
              </div>
            );
          })
        ) : (
          <h5>No Appointments found</h5>
        )}
      </div>
    </Fragment>
  );
}

export default Appointments;
