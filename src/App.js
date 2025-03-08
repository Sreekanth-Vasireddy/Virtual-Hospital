import { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import BookConsultation from "./components/admin/BookConsultation";
import DocRequests from "./components/admin/DocRequests";
import AddHospital from "./components/admin/AddHospital";
import Login from "./components/home/Login";
import Register from "./components/home/Register";
import NavBar from "./components/nav/NavBar";
import BookAConsultation from "./components/patient/BookAConsultation";
import Consultations from "./components/patient/Consultations";
import MedicalRecord from "./components/patient/MedicalRecord";
import Pharmacies from "./components/patient/Pharmacies";
import Profile from "./components/patient/Profile";
import PatientRecords from "./components/doctor/PatientRecords";
import Appointments from "./components/doctor/Appointments";
import Pharmacy from "./components/Pharmacy";
import { ToastContainer, toast } from "react-toastify";
import {
  GetAllConsultations,
  GetAllHospitals,
  GetAllPharmacies,
  GetAllUsers,
  RegisterAuth,
} from "./db/hooks/authHooks";
import { DocRequests as DoctorRequests } from "./db/hooks/authHooks";
import DoctorProfile from "./components/doctor/DoctorProfile";
import AllConsultations from "./components/admin/AllConsultations";
import Prescriptions from "./components/patient/Prescriptions";
import AddPharmacy from "./components/admin/AddPharmacy";

toast.configure();
function App() {
  const user = RegisterAuth();
  const doctorsReqs = DoctorRequests();
  const allUsers = GetAllUsers();
  const allConsultations = GetAllConsultations();
  const hospitals = GetAllHospitals();
  const pharmacies = GetAllPharmacies();

  const notLoggedIn = [
    { content: "Login", key: "/login", icon: "fa-sign-in-alt" },
    { content: "Register", key: "/register", icon: "fa-user-plus" },
  ];
  const loggedInDoc = [
    { content: "Appointments", key: "/appointments", icon: "fa-list-alt" },
    {
      content: "Patient-Records",
      key: "/patientrecords",
      icon: "fa-address-card",
    },
    { content: "Pharmacy", key: "/pharmacy", icon: "fa-notes-medical" },
    { content: "Profile", key: "/docprofile", icon: "fa-user" },
  ];

  const loggedInPatient = [
    { content: "Consultations", key: "/consultations", icon: "fa-list-alt" },
    { content: "Medical Record", key: "/medrecord", icon: "fa-address-card" },
    {
      content: "Book a Consultaiton",
      key: "/bookaconsultation",
      icon: "fa-anchor",
    },
    { content: "Pharmacy", key: "/pharmacies", icon: "fa-notes-medical" },
    {
      content: "Prescriptions",
      key: "/prescriptions",
      icon: "fa-notes-medical",
    },
    {
      content: "Profile",
      key: "/patientprofile",
      icon: "fa-user",
    },
  ];

  const loggedInAdmin = [
    { content: "Doctor Requests", key: "/docrequests", icon: "fa-user-md" },
    {
      content: "Book a Consultation",
      key: "/bookconsultation",
      icon: "fa-anchor",
    },
    {
      content: "View Constultations",
      key: "/viewconsultations",
      icon: "fa-list-alt",
    },
    {
      content: "Add A Hospital",
      key: "/addhospital",
      icon: "fa-plus-square",
    },
    {
      content: "Add A Pharmacy",
      key: "/addPharmacy",
      icon: "fa-plus-circle",
    },
  ];

  return (
    <Fragment>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Modals come before page wrapper */}
      <div
        className="page-wrapper with-navbar with-sidebar"
        data-sidebar-type="overlayed-sm-and-down"
      >
        {user !== null ? (
          user.data.role === "Doctor" ? (
            <>
              <NavBar navLinks={loggedInDoc} fullName={user.data.fullName} />
              <Redirect to="/appointments" />
            </>
          ) : user.data.role === "Patient" ? (
            <>
              <NavBar
                navLinks={loggedInPatient}
                fullName={user.data.fullName}
              />
              <Redirect to="/consultations" />
            </>
          ) : (
            <>
              <NavBar navLinks={loggedInAdmin} fullName={user.data.fullName} />
              <Redirect to="/docrequests" />
            </>
          )
        ) : (
          <>
            <NavBar navLinks={notLoggedIn} notLoggedIn={true} />
            <Redirect to="/" />
          </>
        )}

        {/* navbar, sidebar, sticky alerts go here */}
        <div className="content-wrapper">
          {user === null && <Redirect to="/" />}
          <Route exact path="/">
            <Login docRequests={doctorsReqs} />
          </Route>
          <Route exact path="/login">
            <Login docRequests={doctorsReqs} />
          </Route>
          <Route exact path="/register">
            <Register hospitals={hospitals} />
          </Route>
          <Route exact path="/docrequests">
            <DocRequests docRequests={doctorsReqs} />
          </Route>
          <Route exact path="/bookconsultation">
            <BookConsultation
              users={allUsers}
              consultations={allConsultations}
              hospitals={hospitals}
            />
          </Route>
          <Route exact path="/bookaconsultation">
            <BookAConsultation
              users={allUsers}
              patient={user}
              consultations={allConsultations}
              hospitals={hospitals}
            />
          </Route>
          <Route exact path="/consultations">
            <Consultations
              uid={user && (user.uid || "")}
              consultations={allConsultations}
            />
          </Route>
          <Route exact path="/medrecord">
            <MedicalRecord patient={user} />
          </Route>
          <Route exact path="/patientrecords">
            <PatientRecords users={allUsers} />
          </Route>
          <Route exact path="/appointments">
            <Appointments
              uid={user && (user.uid || "")}
              consultations={allConsultations}
            />
          </Route>
          <Route exact path="/pharmacy">
            <Pharmacy pharmacies={pharmacies} />
          </Route>
          <Route exact path="/docprofile">
            <DoctorProfile uid={user && (user.uid || "")} />
          </Route>
          <Route exact path="/viewconsultations">
            <AllConsultations consults={allConsultations} />
          </Route>
          <Route exact path="/pharmacies">
            <Pharmacies
              uid={user && (user.uid || "")}
              pharmacies={pharmacies}
            />
          </Route>
          <Route exact path="/prescriptions">
            <Prescriptions uid={user && (user.uid || "")} />
          </Route>
          <Route exact path="/patientprofile">
            <Profile uid={user && (user.uid || "")} />
          </Route>
          <Route exact path="/addhospital">
            <AddHospital />
          </Route>
          <Route exact path="/addPharmacy">
            <AddPharmacy />
          </Route>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
