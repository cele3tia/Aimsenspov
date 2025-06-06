// js/login-ui.js - Version 20250606_FinalFix

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

    // reCAPTCHA 위젯 요소도 가져옵니다.
    const recaptchaDiv = document.querySelector('.g-recaptcha');
    const recaptchaSiteKey = recaptchaDiv ? recaptchaDiv.getAttribute('data-sitekey') : null; // data-sitekey를 동적으로 가져옴

    // 필수 요소 확인 시 recaptchaDiv와 recaptchaSiteKey도 포함
    if (!authStatusMessage || !authLogoutBtn || !authFormsSection || !emailInput || !passwordInput || 
        !signUpEmailBtn || !signInEmailBtn || !googleSignInBtn || !guestSignInBtn || !authErrorMessage || !recaptchaDiv || !recaptchaSiteKey) { 
        console.error("Error: One or more required authentication UI elements or reCAPTCHA elements not found in the HTML. Please check your HTML structure or reCAPTCHA site key.");
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

    // reCAPTCHA 토큰을 가져와 인증 함수를 실행하는 헬퍼 함수
    async function executeRecaptcha(action, authFunction) {
        authErrorMessage.style.display = 'none';
        try {
            if (typeof grecaptcha === 'undefined' || !grecaptcha.enterprise) {
                displayAuthError("reCAPTCHA is not loaded. Please try again or check your internet connection.");
                console.error("reCAPTCHA object not found or not ready.");
                return;
            }

            // data-sitekey 값을 사용하여 reCAPTCHA 실행 (하드코딩된 이전 키 제거됨)
            const token = await grecaptcha.enterprise.execute(recaptchaSiteKey, { action: action });
            console.log(`reCAPTCHA token for action ${action}:`, token);
            
            // TODO: 여기서 백엔드 서버로 토큰을 보내 검증해야 합니다. (이 부분은 사용자님께서 직접 구현 필요)
            // 현재 프론트엔드 프로젝트에서는 이 토큰을 검증할 서버가 없습니다.
            // 실제 구현에서는 이 토큰을 서버로 보내고, 서버가 Google reCAPTCHA API와 통신하여
            // 토큰을 검증한 후, 결과에 따라 Firebase 인증을 진행해야 합니다.
            
            // 임시로 토큰이 있으면 인증 진행 (보안 취약)
            if (token) {
                await authFunction();
            } else {
                displayAuthError("reCAPTCHA verification failed. Please try again.");
            }

        } catch (error) {
            displayAuthError(`reCAPTCHA Error: ${error.message}`);
            console.error("reCAPTCHA execution error:", error);
        }
    }

    signUpEmailBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        executeRecaptcha('signup', async () => {
            if (password.length < 6) {
                displayAuthError("Password must be at least 6 characters long.");
                return;
            }
            await createUserWithEmailAndPassword(auth, email, password)
                .catch((error) => {
                    displayAuthError(`Registration Error: ${error.message}`);
                });
        });
    });

    signInEmailBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        executeRecaptcha('login', async () => {
            await signInWithEmailAndPassword(auth, email, password)
                .catch((error) => {
                    displayAuthError(`Login Error: ${error.message}`);
                });
        });
    });

    googleSignInBtn.addEventListener('click', () => {
        const provider = new GoogleAuthProvider();
        executeRecaptcha('login_google', async () => {
            await signInWithPopup(auth, provider)
                .catch((error) => {
                    displayAuthError(`Google Login Error: ${error.message}`);
                });
        });
    });

    guestSignInBtn.addEventListener('click', () => {
        executeRecaptcha('login_guest', async () => {
            await signInAnonymously(auth)
                .catch((error) => {
                    displayAuthError(`Guest Login Error: ${error.message}`);
                });
        });
    });

    authLogoutBtn.addEventListener('click', () => {
        signOut(auth)
            .catch((error) => {
                displayAuthError(`Logout Error: ${error.message}`);
            });
    });
}