import { db, firebase } from "../../firebase/firebase";
import { toast } from "react-toastify";

export const signIn = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    toast.success("Logged In");
  } catch (err) {
    toast.error("Error Login");
    console.log(err.message);
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(err.message);
  }
};

export const registerUser = async (data) => {
  try {
    let userData = {
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      dob: data.dob,
      createdAt: new Date().toGMTString(),
      role: data.role,
    };
    if (data.role === "Patient") {
      userData.medicalRecords = {
        temperature: "N/A",
        bp: "N/A",
        sugar: "N/A",
      };
      userData.mobile = data.mobile;
      userData.medicare = data.medicare;
      userData.address = data.address;
      userData.profileImage = "";
    }
    if (data.role === "Doctor") {
      userData.hospital = data.hospital;
      userData.specialization = data.specialization;
      userData.profileImage = "";
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);
    await db.collection("users").doc(createdUser.user.uid).set(userData);
    toast.success("User Created");
  } catch (err) {
    toast.error("Error Creating user");
    console.log(err.message);
  }
};

export const sendDocRequest = async (data) => {
  try {
    let userData = {
      fullName: `${data.firstName} ${data.lastName}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      createdAt: new Date().toGMTString(),
      role: data.role,
      dob: data.dob,
      specialization: data.specialization,
      password: data.password,
      hospital: data.hospital,
      pendingApproval: true,
      adminId: "",
      userCreated: false,
    };
    await db.collection("docrequests").add(userData);
    toast.success("Request Sent");
  } catch (err) {
    toast.error("Error Sending request");
    console.log(err.message);
  }
};

export const updateDocRequest = async (data, userCreated) => {
  try {
    let updateData = {};
    if (userCreated) {
      updateData = {
        userCreated: true,
      };
    } else {
      let currentAdminId = firebase.auth().currentUser.uid;
      updateData = {
        pendingApproval: false,
        adminId: currentAdminId,
      };
    }
    await db.collection("docrequests").doc(data.id).update(updateData);
    toast.success("Doctor Updated");
  } catch (err) {
    toast.error("Error Accepting Doctor");
    console.log(err.message);
  }
};

export const bookConsultation = async (
  docData,
  patientUid,
  patientfullName,
  patientMedicare,
  patientMobile,
  patientDob,
  dateAndSlot
) => {
  try {
    let data = {
      docId: docData.id,
      patientId: patientUid,
      docName: docData.fullName,
      patientName: patientfullName,
      patientMedicare: patientMedicare,
      patientMobile: patientMobile,
      patientDob: patientDob,
      specialization: docData.specialization,
      date: dateAndSlot.date,
      slot: dateAndSlot.slot,
    };
    await db.collection("consultations").add(data);
    toast.success(`Booked on ${data.date}`);
  } catch (err) {
    toast.error("Error booking");
    console.log(err.message);
  }
};

export const updatePatientMedicalRecord = async (
  patienId,
  { bp, sugar, temperature }
) => {
  try {
    await db
      .collection("users")
      .doc(patienId)
      .update({ medicalRecords: { bp, sugar, temperature } });
    toast.success(`Medical Record Updated`);
  } catch (err) {
    toast.error("Error updating record");
    console.log(err.message);
  }
};

export const updateDocPic = async (file, uid) => {
  try {
    toast.info("Uploading.. Please wait");
    const uploadTask = await firebase
      .storage()
      .ref(`images/${file.name}-${file.lastModified}`)
      .put(file);
    const downloadUrl = await uploadTask.ref.getDownloadURL();
    await db.collection("users").doc(uid).update({ profileImage: downloadUrl });
    toast.success("Upload Success");
    console.log(downloadUrl);
    return downloadUrl;
  } catch (err) {
    toast.error("Error Uploading File");
    console.log(err.message);
  }
};

export const uploadPrescription = async (pharmacy, file, uid) => {
  try {
    toast.info("Uploading... Please wait");
    const uploadTask = await firebase
      .storage()
      .ref(`prescriptions/${file.name}-${file.lastModified}`)
      .put(file);
    const downloadUrl = await uploadTask.ref.getDownloadURL();

    const prescriptionData = {
      downloadUrl,
      patientUid: uid,
      pharmacyId: pharmacy.storeId,
      pharmacyAddress: pharmacy.address,
      pharmacyName: pharmacy.name,
      uploadedOn: new Date().toDateString(),
      pharmacyPhone: pharmacy.phone,
    };
    console.log(pharmacy);
    await db.collection("prescriptions").add(prescriptionData);
    toast.success("Upload Success");
    console.log(downloadUrl);
    return downloadUrl;
  } catch (err) {
    toast.error("Error Uploading File");
    console.log(err.message);
  }
};

export const deletePrescription = async (id) => {
  try {
    await db.collection("prescriptions").doc(id).delete();
    toast.success("Delete Success");
  } catch (err) {
    toast.error("Error Deleting File");
    console.log(err.message);
  }
};

export const deleteConsultation = async (id) => {
  try {
    await db.collection("consultations").doc(id).delete();
    toast.success("Consultation Cancelled");
  } catch (err) {
    toast.error("Unable to cancel consultation");
    console.log(err.message);
  }
};

export const addHospital = async (hospitalData) => {
  try {
    await db.collection("hospitals").add(hospitalData);
    toast.success("Hospital Added");
  } catch (err) {
    toast.error("Unable to add hospital");
    console.log(err.message);
  }
};

export const addPharmacy = async (pharmacyData) => {
  try {
    await db.collection("pharmacies").add(pharmacyData);
    toast.success("Pharmacy Added");
  } catch (err) {
    toast.error("Unable to add Pharmacy");
    console.log(err.message);
  }
};

export const deleteDocRequest = async (id) => {
  try {
    await db.collection("docrequests").doc(id).delete();
    toast.success("Delete Success");
  } catch (err) {
    toast.error("Error Deleting Request");
    console.log(err.message);
  }
};

export const updateConsultation = async (consultationId, dateAndSlot) => {
  try {
    await db
      .collection("consultations")
      .doc(consultationId)
      .update(dateAndSlot);
    toast.success("Consultation Updated");
  } catch (err) {
    toast.error("Error updating consultation");
    console.log(err.message);
  }
};
