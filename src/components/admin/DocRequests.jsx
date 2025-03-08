import React, { Fragment } from "react";
import Request from "./Request";

function DocRequests({ docRequests }) {
  return (
    <Fragment>
      <div className="container">
        {docRequests.length > 0 ? (
          <div className="row row-eq-spacing-sm justify-content-center">
            {docRequests.map((request, i) => {
              return (
                <div key={i} className="col-sm-12 col-lg-6 col-xl-3">
                  <Request docRequest={request} />
                </div>
              );
            })}
          </div>
        ) : (
          <div>No Doctor requests found</div>
        )}
      </div>
    </Fragment>
  );
}

export default DocRequests;
