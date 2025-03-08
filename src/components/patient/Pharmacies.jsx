import React, { Fragment } from "react";
import { uploadPrescription } from "../../db/ops/authOps";

function Pharmacies({ uid, pharmacies }) {
  // const pharmacies = [
  //   {
  //     name: "Pharmacy One",
  //     storeId: "Store Id: 233434",
  //     address: "19-23 Errol St, North Melbourne VIC 3051, Australia",
  //     phone: "+61111111111",
  //   },
  //   {
  //     name: "Pharmacy Two",
  //     storeId: "Store Id: 764857",
  //     address: "shop l2/345 Bourke St, Melbourne VIC 3000, Australia",
  //     phone: "+61222222222",
  //   },
  //   {
  //     name: "Pharmacy Three",
  //     storeId: "Store Id: 786354",
  //     address: "Shop l2/322 Bourke St, Sydney VIC 3052, Australia",
  //     phone: "+61333333333",
  //   },
  //   {
  //     name: "Pharmacy Four",
  //     storeId: "Store Id: 263547",
  //     address: "19-22 Fake St, Melbourne VIC 3051, Australia",
  //     phone: "+61444444444",
  //   },
  //   {
  //     name: "Pharmacy Five",
  //     storeId: "Store Id: 875968",
  //     address: "121-25 Normal St, South Melbourne VIC 3050, Australia",
  //     phone: "+61555555555",
  //   },
  //   {
  //     name: "Pharmacy Six",
  //     storeId: "Store Id: 174635",
  //     address: "29-233 Super St, North Melbourne VIC 3051, Australia",
  //     phone: "+61666666666",
  //   },
  //   {
  //     name: "Pharmacy Seven",
  //     storeId: "Store Id: 098576",
  //     address: "12-33 Errol St, Sydney, Australia",
  //     phone: "+61777777777",
  //   },
  //   {
  //     name: "Pharmacy Eight",
  //     storeId: "Store Id: 645437",
  //     address: "19-220 Errol St, North Melbourne VIC 3051, Australia",
  //     phone: "+61888888888",
  //   },
  // ];

  const handle = async (e, pharma) => {
    await uploadPrescription(pharma, e.target.files[0], uid);
  };

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
                  <hr />
                  <div className="form-group">
                    <div className="custom-file">
                      <label htmlFor={pharma.storeId}>
                        Upload Prescription
                      </label>
                      <input
                        type="file"
                        id={pharma.storeId}
                        accept=".jpg,.png,.jpeg,.pdf,.doc,.docx"
                        onChange={(e) => handle(e, pharma)}
                      />
                    </div>
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

export default Pharmacies;
