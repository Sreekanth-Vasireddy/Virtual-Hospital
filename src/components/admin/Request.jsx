import React from "react";
import { updateDocRequest, deleteDocRequest } from "../../db/ops/authOps";

function Request({ docRequest }) {
  return (
    <div className="mw-full">
      <div className="card p-0 m-10">
        <div className="content m-15">
          <h4 className="content-title">{docRequest.fullName}</h4>
          <div>
            <span className="text-muted">
              <i style={{ color: "red" }} className="fa fa-clock mr-5"></i>
              {new Date(docRequest.createdAt).toDateString()}
            </span>
          </div>

          <hr />

          <div className="content m-0">
            <div>{docRequest.email}</div>
            <hr />
            <div>{docRequest.hospital}</div>
            <hr />
            <div>{docRequest.specialization}</div>
            {docRequest.pendingApproval ? (
              <div className="mt-5">
                <form className="form-inline">
                  <div className="form-group mb-0">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        updateDocRequest(docRequest);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteDocRequest(docRequest.id);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mt-5">
                <button className="btn btn-success btn-sm">Accepted</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Request;
