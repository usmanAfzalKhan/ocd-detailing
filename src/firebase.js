import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd1E5DeSyrLvz6oHEVR-qSEKrgF3ZFS0w",
  authDomain: "ocd-detailing.firebaseapp.com",
  projectId: "ocd-detailing",
  storageBucket: "ocd-detailing.appspot.com",
  messagingSenderId: "427911302464",
  appId: "1:427911302464:web:ca954d55d12affd6103ea5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
