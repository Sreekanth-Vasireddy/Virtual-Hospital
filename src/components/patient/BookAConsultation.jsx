import React, { Fragment, useState } from "react";
import { bookConsultation } from "../../db/ops/authOps";

function BookAConsultation({ users, patient, consultations, hospitals }) {
  const initState = {
    hospital: "",
    specialization: "",
  };

  const initDateAndSlot = {
    date: "",
    slot: "",
  };

  const [bookingState, setBookingState] = useState(initState);
  const [selectedDoc, setSelectedDoc] = useState(0);
  const [dateAndSlot, setDateAndSlot] = useState(initDateAndSlot);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const availableDates = [];
  for (let i = 1; i <= 30; i++) {
    availableDates.push(
      new Date(new Date().setDate(today.getDate() + i)).toDateString()
    );
  }

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
  const handleChange = (e) => {
    setBookingState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setSelectedDoc(0);
    setDateAndSlot(initDateAndSlot);
    setBookedSlots([]);
  };

  const handleDateSlot = (e) => {
    setDateAndSlot((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === "date") {
      const bookedslots = [];

      consultations.forEach((item) => {
        if (
          item.docId === users[selectedDoc - 1].id &&
          item.date === e.target.value
        ) {
          bookedslots.push(item.slot);
        }
      });
      setBookedSlots(bookedslots);
    }
  };

  const book = async () => {
    setLoading(true);
    await bookConsultation(
      users[selectedDoc - 1],
      patient.uid,
      patient.data.fullName,
      patient.data.medicare,
      patient.data.mobile,
      patient.data.dob,
      dateAndSlot
    );
    console.log(patient);
    setLoading(false);
    setBookingState(initState);
    setSelectedDoc(0);
    setDateAndSlot(initDateAndSlot);
    setBookedSlots([]);
  };

  const hanldeDocChange = (e) => {
    setSelectedDoc(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="mt-20"></div>
      <div className="row">
        <div className="col"></div>
        <div className="col-8 col-lg-6">
          <form>
            <div className="form-group">
              <label className="required" htmlFor="hospitals">
                Hospital
              </label>
              <select
                className="form-control"
                id="hospitals"
                name="hospital"
                required="required"
                value={bookingState.hospital}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Hospital
                </option>
                {hospitals.map((hospital, i) => (
                  <option key={i} value={hospital.name}>
                    {hospital.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="required" htmlFor="specialization">
                Specialization
              </label>
              <select
                className="form-control"
                id="specialization"
                name="specialization"
                required="required"
                value={bookingState.specialization}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Specialization
                </option>
                <option value="Physician">Physician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dentist">Dentist</option>
              </select>
            </div>

            <div className="form-group">
              <label className="required" htmlFor="availabledocs">
                Available Doctors
              </label>
              <select
                className="form-control"
                id="availabledocs"
                required="required"
                value={selectedDoc}
                onChange={hanldeDocChange}
              >
                <option value={0} disabled>
                  Select Doctors
                </option>

                {users &&
                  users.map((user, i) => {
                    if (
                      user.role === "Doctor" &&
                      user.specialization === bookingState.specialization &&
                      user.hospital === bookingState.hospital
                    )
                      return <option value={i + 1}>{user.fullName}</option>;
                    else return <></>;
                  })}
              </select>
            </div>

            {selectedDoc > 0 && (
              <Fragment>
                <div className="form-group">
                  <label className="required" htmlFor="pickDate">
                    Date
                  </label>
                  <select
                    className="form-control"
                    id="pickDate"
                    name="date"
                    required="required"
                    value={dateAndSlot.date}
                    onChange={handleDateSlot}
                  >
                    <option value="" disabled>
                      Pick a Date
                    </option>

                    {availableDates.map((date) => {
                      return <option value={date}>{date}</option>;
                    })}
                  </select>
                </div>

                {dateAndSlot.date.length > 0 && (
                  <div className="form-group">
                    <label className="required" htmlFor="slot">
                      Slot
                    </label>
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
                          return (
                            <option value={slot.value}>{slot.name}</option>
                          );
                        else return <></>;
                      })}
                    </select>
                  </div>
                )}
              </Fragment>
            )}
            <button
              className="btn btn-danger btn-sm"
              type="button"
              onClick={book}
              disabled={loading}
            >
              Book
            </button>
          </form>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}

export default BookAConsultation;
