import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDP5bRueijcm5zt6r3Zt_cO9ur9OZj3p3o",
  authDomain: "virtual-doctor-9a775.firebaseapp.com",
  projectId: "virtual-doctor-9a775",
  storageBucket: "virtual-doctor-9a775.appspot.com",
  messagingSenderId: "26550726410",
  appId: "1:26550726410:web:3f409011a2279d736d14f3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db, firebase };
