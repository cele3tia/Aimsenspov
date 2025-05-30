import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

//Firebase 값
const firebaseConfig = {
    apiKey: "AIzaSyCrQmNtmS_2xO8uPYjXAjJ4mkz2QvcUcwk",
    authDomain: "aimsenspov.firebaseapp.com",
    projectId: "aimsenspov",
    storageBucket: "aimsenspov.appspot.com",
    messagingSenderId: "178400831693",
    appId: "1:178400831693:web:6ce04182261923c1eae184",
    measurementId: "G-JJF35EPEDB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };