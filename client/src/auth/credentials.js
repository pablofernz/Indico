import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD0yWsFDf_onTP3lg-w1cSFNzIyVdOBXOA",
    authDomain: "project-indico-f7845.firebaseapp.com",
    projectId: "project-indico-f7845",
    storageBucket: "project-indico-f7845.firebasestorage.app",
    messagingSenderId: "694403477415",
    appId: "1:694403477415:web:8b7c3ff2831f1b5d665082"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase)

