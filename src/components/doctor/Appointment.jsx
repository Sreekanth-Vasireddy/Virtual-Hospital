import React, { Fragment } from "react";

function Appointment({ consultation }) {
  const slots = [
    { value: "slot1", name: "Slot-1  9:00 - 9:15" },
    { value: "slot2", name: "Slot-2  9:15 - 9:30" },
    { value: "slot3", name: "Slot-3  9:30 - 9:45" },
    { value: "slot4", name: "Slot-4  9:45 - 9:60" },
    { value: "slot5", name: "Slot-5  10:00 - 10:15" },
    { value: "slot6", name: "Slot-6  10:15 - 10:30" },
    { value: "slot7", name: "Slot-7  10:30 - 10:45" },
    { value: "slot8", name: "Slot-8  10:45 - 10:60" },
    { value: "slot9", name: "Slot-9  11:00 - 11:15" },
    { value: "slot10", name: "Slot-10  11:15 - 11:30" },
    { value: "slot11", name: "Slot-11  11:30 - 11:45" },
    { value: "slot12", name: "Slot-12  11:45 - 11:60" },
    { value: "slot13", name: "Slot-13  12:00 - 12:15" },
    { value: "slot14", name: "Slot-14  12:15 - 12:30" },
    { value: "slot15", name: "Slot-15  12:30 - 12:45" },
    { value: "slot16", name: "Slot-16  12:45 - 12:60" },
    { value: "slot17", name: "Slot-17  13:00 - 13:15" },
    { value: "slot18", name: "Slot-18  13:15 - 13:30" },
    { value: "slot19", name: "Slot-19  13:30 - 13:45" },
    { value: "slot20", name: "Slot-20  13:45 - 13:60" },
    { value: "slot21", name: "Slot-21  14:00 - 14:15" },
    { value: "slot22", name: "Slot-22  14:15 - 14:30" },
    { value: "slot23", name: "Slot-23  14:30 - 14:45" },
    { value: "slot24", name: "Slot-24  14:45 - 14:60" },
    { value: "slot25", name: "Slot-25  15:00 - 15:15" },
    { value: "slot26", name: "Slot-26  15:15 - 15:30" },
    { value: "slot27", name: "Slot-27  15:30 - 15:45" },
    { value: "slot28", name: "Slot-28  15:45 - 15:60" },
    { value: "slot29", name: "Slot-29  16:00 - 16:15" },
    { value: "slot30", name: "Slot-30  16:15 - 16:30" },
    { value: "slot31", name: "Slot-31  16:30 - 16:45" },
    { value: "slot32", name: "Slot-32  16:45 - 16:60" },
  ];

  return (
    <div className="mw-full">
      <div className="card  p-0">
        <div className="px-card py-10 border-bottom">
          <h2 className="card-title font-size-18 m-0">
            {consultation.patientName}
          </h2>
          <div>
            <span className="font-size-5 ">
              <i
                style={{ color: "red" }}
                className="fa fa-clock mr-5"
                aria-hidden="true"
              ></i>{" "}
              {consultation.date}
            </span>
          </div>
        </div>

        <div className="content m-10">
          <div>{consultation.specialization}</div>

          <hr />
          <div>{`Medicare: ${consultation.patientMedicare}`}</div>

          <hr />
          <div>{`Phone: ${consultation.patientMobile}`}</div>

          <hr />
          <div>{`DOB: ${consultation.patientDob}`}</div>

          <hr />
          {slots.map((slot, i) => {
            if (consultation.slot === slot.value)
              return <div key={i}>{slot.name}</div>;
            else return <Fragment key={i} />;
          })}

          <hr />
          <form className="form-inline">
            <div className="form-group mb-10">
              <button className="btn btn-danger btn-sm">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </button>
              <button className="btn btn-success btn-sm">
                <i className="fa fa-comment-alt" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
