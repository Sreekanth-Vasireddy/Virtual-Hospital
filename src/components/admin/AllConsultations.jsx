import React, { Fragment } from "react";
import Consultation from "./Consultation";

function AllConsultations({ consults }) {
  return (
    <Fragment>
      {consults.length > 0 ? (
        <div className="row row-eq-spacing-sm">
          {consults.map((item, i) => {
            return (
              <div key={i} className="col-sm-12 col-lg-6 col-xl-3">
                <Consultation consultation={item} consultations={consults} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Consultations Found</div>
      )}
    </Fragment>
  );
}

export default AllConsultations;
