// js/login-ui.js 
import { auth } from './firebase-init.js'; 

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


export function setupAuthUI() {
    const authStatusMessage = document.getElementById('authStatusMessage');
    const authLogoutBtn = document.getElementById('authLogoutBtn');
    const authFormsSection = document.getElementById('authFormsSection'); 
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const signUpEmailBtn = document.getElementById('signUpEmailBtn'); 
    const signInEmailBtn = document.getElementById('signInEmailBtn'); 
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    const guestSignInBtn = document.getElementById('guestSignInBtn'); 
    const authErrorMessage = document.getElementById('authErrorMessage');

    if (!authStatusMessage || !authLogoutBtn || !authFormsSection || !emailInput || !passwordInput || 
        !signUpEmailBtn || !signInEmailBtn || !googleSignInBtn || !guestSignInBtn || !authErrorMessage) { 
        console.error("Error: One or more required authentication UI elements not found in the HTML. Please check your HTML structure.");
        return; 
    }

    function displayAuthError(message) {
        authErrorMessage.textContent = message;
        authErrorMessage.style.display = 'block';
    }

    onAuthStateChanged(auth, (user) => {
        const authElementsToToggle = [
            emailInput, passwordInput, signUpEmailBtn, signInEmailBtn, googleSignInBtn, guestSignInBtn 
        ];

        if (user) {
            let userDisplayInfo = "Logged in as: ";
            if (user.isAnonymous) {
                userDisplayInfo += `Guest (UID: ${user.uid.substring(0,6)}...)`;
            } else if (user.email) {
                userDisplayInfo += user.email;
            } else if (user.displayName) {
                userDisplayInfo += user.displayName;
            } else {
                userDisplayInfo = `User (UID: ${user.uid.substring(0,6)}...)`;
            }
            authStatusMessage.textContent = userDisplayInfo;
            authLogoutBtn.style.display = 'inline-block';
            authFormsSection.style.display = 'none'; 
            authErrorMessage.style.display = 'none'; 
        } else {
            authStatusMessage.textContent = 'Not logged in.';
            authLogoutBtn.style.display = 'none';

            authElementsToToggle.forEach(el => { 
                if(el) {
                    el.style.display = 'inline-block'; 
                    if (el.tagName === 'INPUT') el.value = ''; 
                }
            });
            authFormsSection.style.display = 'block';
            authErrorMessage.style.display = 'none'; 
        }
    });

    signUpEmailBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        authErrorMessage.style.display = 'none'; 
        if (password.length < 6) {
            displayAuthError("Password must be at least 6 characters long.");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                displayAuthError(`Registration Error: ${error.message}`);
            });
    });

    signInEmailBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        authErrorMessage.style.display = 'none'; 
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                displayAuthError(`Login Error: ${error.message}`);
            });
    });

    googleSignInBtn.addEventListener('click', () => {
        const provider = new GoogleAuthProvider();
        authErrorMessage.style.display = 'none'; 
        signInWithPopup(auth, provider)
            .catch((error) => {
                displayAuthError(`Google Login Error: ${error.message}`);
            });
    });

    guestSignInBtn.addEventListener('click', () => { 
        authErrorMessage.style.display = 'none'; 
        signInAnonymously(auth)
            .catch((error) => {
                displayAuthError(`Guest Login Error: ${error.message}`);
            });
    });

    authLogoutBtn.addEventListener('click', () => {
        signOut(auth)
            .catch((error) => {
                displayAuthError(`Logout Error: ${error.message}`);
            });
    });
}