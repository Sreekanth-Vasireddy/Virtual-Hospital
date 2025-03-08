import React, { Fragment, useEffect, useState } from "react";
import { deleteConsultation, updateConsultation } from "../../db/ops/authOps";

function Consultation({ consultation, consultations }) {
  const [editing, setEditing] = useState(false);

  const initDateAndSlot = {
    date: consultation.date,
    slot: consultation.slot,
  };

  const [dateAndSlot, setDateAndSlot] = useState(initDateAndSlot);
  const [bookedSlots, setBookedSlots] = useState([]);

  const today = new Date();
  const availableDates = [];
  for (let i = 0; i <= 30; i++) {
    availableDates.push(
      new Date(new Date().setDate(today.getDate() + i)).toDateString()
    );
  }

  const handleDateSlot = (e) => {
    setDateAndSlot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "date") {
      const bookedslots = [];

      consultations.forEach((item) => {
        if (item.docId === consultation.docId && item.date === e.target.value) {
          bookedslots.push(item.slot);
        }
      });
      setBookedSlots(bookedslots);
    }
  };

  useEffect(() => {
    const bookedslots = [];

    consultations.forEach((item) => {
      if (
        item.docId === consultation.docId &&
        item.date === consultation.date
      ) {
        bookedslots.push(item.slot);
      }
    });
    setBookedSlots(bookedslots);
  }, [consultation.date, consultation.docId, consultations]);

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
      <div className="card  p-0 m-10">
        <div className="px-card py-10 border-bottom">
          <h2 className="card-title font-size-18 m-0">
            {consultation.docName}
          </h2>
        </div>
        <div className="content m-10">
          <div>{`Patient: ${consultation.patientName}`}</div>

          <hr />
          <div>{`Phone: ${consultation.patientMobile}`}</div>

          <hr />
          <div>{`Medicare: ${consultation.patientMedicare}`}</div>

          <hr />
          <div>{`DOB: ${consultation.patientDob}`}</div>

          <hr />
          {!editing && (
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
          )}

          {editing && (
            <div>
              <select
                className="form-control"
                id="pickDate"
                name="date"
                required="required"
                value={dateAndSlot.date}
                onChange={handleDateSlot}
              >
                <option value={dateAndSlot.date} disabled>
                  {dateAndSlot.date}
                </option>

                {availableDates.map((date) => {
                  return <option value={date}>{date}</option>;
                })}
              </select>
            </div>
          )}

          <hr />
          <div>{consultation.specialization}</div>

          <hr />
          {!editing &&
            slots.map((slot, i) => {
              if (consultation.slot === slot.value)
                return <div key={i}>{slot.name}</div>;
              else return <Fragment key={i} />;
            })}

          {editing && (
            <select
              className="form-control"
              id="slot"
              name="slot"
              required="required"
              value={dateAndSlot.slot}
              onChange={handleDateSlot}
            >
              <option value="" disabled>
                Pick a Slot
              </option>
              {slots.map((slot) => {
                if (!bookedSlots.includes(slot.value))
                  return <option value={slot.value}>{slot.name}</option>;
                else return <></>;
              })}
            </select>
          )}

          <hr />
          <form className="form-inline">
            <div className="form-group mb-10">
              {(function () {
                let bookedDate =
                  consultation.date +
                  " " +
                  slots
                    .filter((slot) => slot.value === consultation.slot)[0]
                    .name.split(" ")[2] +
                  ":00";
                let bDate = new Date(bookedDate);
                bDate.setHours(bDate.getHours() - 3);
                if (new Date() <= bDate && !editing) {
                  return (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditing(true);
                      }}
                    >
                      Edit
                    </button>
                  );
                }
              })()}
              {!editing && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteConsultation(consultation.id);
                  }}
                >
                  Cancel
                </button>
              )}
              {editing && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={async (e) => {
                    e.preventDefault();
                    await updateConsultation(consultation.id, dateAndSlot);
                    setEditing(false);
                    setDateAndSlot(initDateAndSlot);
                  }}
                >
                  Save
                </button>
              )}
              {editing && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditing(false);
                    setDateAndSlot(initDateAndSlot);
                  }}
                >
                  Go Back
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Consultation;
