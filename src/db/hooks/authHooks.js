import { useEffect, useState } from "react";
import { db, firebase } from "../../firebase/firebase";

function RegisterAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      return firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          let document = await db.collection("users").doc(user.uid).get();
          setUser({
            uid: user.uid,
            data: document.data(),
          });
        } else {
          setUser(null);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return user;
}

function DocRequests() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    try {
      return db.collection("docrequests").onSnapshot((snapshot) => {
        const docRequests = [];

        snapshot.forEach((request) => {
          docRequests.push({ ...request.data(), id: request.id });
        });

        setDocs(docRequests);
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return docs;
}

function GetAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    try {
      return db.collection("users").onSnapshot((snapshot) => {
        const dbUsers = [];

        snapshot.forEach((user) => {
          dbUsers.push({ ...user.data(), id: user.id });
        });

        setUsers(dbUsers);
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return users;
}

function GetAllConsultations() {
  const [consultatios, setConsultatios] = useState([]);

  useEffect(() => {
    try {
      return db.collection("consultations").onSnapshot((snapshot) => {
        const dbConsultations = [];

        snapshot.forEach((item) => {
          dbConsultations.push({ ...item.data(), id: item.id });
        });

        setConsultatios(dbConsultations);
      });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return consultatios;
}

function GetDoc(uid) {
  const [doc, setDoc] = useState({
    doctor: {},
    dataPresent: false,
  });

  useEffect(() => {
    if (uid) {
      try {
        return db
          .collection("users")
          .doc(uid)
          .onSnapshot((snapshot) => {
            setDoc({
              doctor: { ...snapshot.data() },
              dataPresent: true,
            });
          });
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [uid]);
  return doc;
}

function GetPrescriptions(uid) {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    try {
      return db
        .collection("prescriptions")
        .where("patientUid", "==", uid)
        .onSnapshot((snapshot) => {
          const dbPrescriptions = [];
          snapshot.forEach((item) => {
            dbPrescriptions.push({ ...item.data(), id: item.id });
          });
          setPrescriptions(dbPrescriptions);
        });
    } catch (err) {
      console.log(err.message);
    }
  }, [uid]);

  return prescriptions;
}

function GetAllHospitals() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    try {
      return db
        .collection("hospitals")
        .orderBy("name")
        .onSnapshot((snapshot) => {
          const dbHospitals = [];

          snapshot.forEach((item) => {
            dbHospitals.push({ ...item.data(), id: item.id });
          });

          setHospitals(dbHospitals);
        });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return hospitals;
}

function GetAllPharmacies() {
  const [pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    try {
      return db
        .collection("pharmacies")
        .orderBy("name")
        .onSnapshot((snapshot) => {
          const dbPharmacies = [];

          snapshot.forEach((item) => {
            dbPharmacies.push({ ...item.data(), id: item.id });
          });

          setPharmacies(dbPharmacies);
        });
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  return pharmacies;
}

export {
  RegisterAuth,
  DocRequests,
  GetAllUsers,
  GetAllConsultations,
  GetDoc,
  GetPrescriptions,
  GetAllHospitals,
  GetAllPharmacies,
};
