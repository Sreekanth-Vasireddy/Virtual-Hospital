import React, { Fragment } from "react";

function Pharmacy({ pharmacies }) {
  return (
    <Fragment>
      <div className="row row-eq-spacing-sm">
        {pharmacies.map((pharma) => (
          <div key={pharma.storeId} className="col-sm-12 col-lg-6 col-xl-3">
            <div className="mw-full">
              <div className="card  p-0 m-10">
                <div className="px-card py-10 border-bottom">
                  <h2 className="card-title font-size-18 m-0">{pharma.name}</h2>
                </div>

                <div className="content m-10">
                  <div>{pharma.storeId}</div>
                  <hr />
                  <div>{pharma.phone}</div>
                  <hr />
                  <div>
                    <i
                      style={{ color: "red" }}
                      className="fa fa-map-marker-alt mr-5"
                      aria-hidden="true"
                    ></i>
                    {pharma.address}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Pharmacy;
