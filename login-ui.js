// js/login-ui.js (수정된 코드)

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
    // DOM 요소 참조 및 유효성 검사
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

    // 필수 DOM 요소가 모두 존재하는지 확인
    if (!authStatusMessage || !authLogoutBtn || !authFormsSection || !emailInput || !passwordInput || 
        !signUpEmailBtn || !signInEmailBtn || !googleSignInBtn || !guestSignInBtn || !authErrorMessage) {
        console.error("오류: 로그인/회원가입 UI의 필수 DOM 요소를 찾을 수 없습니다. HTML을 확인해주세요.");
        return; // 요소가 없으면 함수 실행 중단
    }

    // 오류 메시지 표시 함수
    function displayAuthError(message) {
        authErrorMessage.textContent = message;
        authErrorMessage.style.display = 'block';
    }

    // 인증 상태 변경 감지 (UI 업데이트)
    onAuthStateChanged(auth, (user) => {
        const authElementsToToggle = [
            emailInput, passwordInput, signUpEmailBtn, signInEmailBtn, googleSignInBtn, guestSignInBtn
        ];

        if (user) {
            // 로그인된 상태
            let userDisplayInfo = "로그인됨: ";
            if (user.isAnonymous) {
                userDisplayInfo += `게스트 (UID: ${user.uid.substring(0,6)}...)`;
            } else if (user.email) {
                userDisplayInfo += user.email;
            } else if (user.displayName) {
                userDisplayInfo += user.displayName;
            } else {
                userDisplayInfo = `사용자 (UID: ${user.uid.substring(0,6)}...)`;
            }
            authStatusMessage.textContent = userDisplayInfo;
            authLogoutBtn.style.display = 'inline-block';
            authFormsSection.style.display = 'none'; 
            authErrorMessage.style.display = 'none'; // 로그인 성공 시 오류 메시지 숨김
        } else {
            // 로그아웃된 상태
            authStatusMessage.textContent = '로그인되지 않음.';
            authLogoutBtn.style.display = 'none';

            authElementsToToggle.forEach(el => { 
                if(el) {
                    el.style.display = 'inline-block'; 
                    if (el.tagName === 'INPUT') el.value = ''; // 입력 필드 초기화
                }
            });
            authFormsSection.style.display = 'block';
            authErrorMessage.style.display = 'none'; // 로그아웃 시 오류 메시지 숨김
        }
    });

    // 각 로그인/회원가입 버튼 이벤트 리스너 연결
    signUpEmailBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        authErrorMessage.style.display = 'none'; // 새 시도 전 오류 메시지 숨김
        if (password.length < 6) {
            displayAuthError("비밀번호는 최소 6자 이상이어야 합니다.");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                displayAuthError(`회원가입 오류: ${error.message}`);
            });
    });

    signInEmailBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;
        authErrorMessage.style.display = 'none'; // 새 시도 전 오류 메시지 숨김
        signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                displayAuthError(`로그인 오류: ${error.message}`);
            });
    });

    googleSignInBtn.addEventListener('click', () => {
        const provider = new GoogleAuthProvider();
        authErrorMessage.style.display = 'none'; // 새 시도 전 오류 메시지 숨김
        signInWithPopup(auth, provider)
            .catch((error) => {
                displayAuthError(`Google 로그인 오류: ${error.message}`);
            });
    });

    guestSignInBtn.addEventListener('click', () => {
        authErrorMessage.style.display = 'none'; // 새 시도 전 오류 메시지 숨김
        signInAnonymously(auth)
            .catch((error) => {
                displayAuthError(`게스트 로그인 오류: ${error.message}`);
            });
    });

    authLogoutBtn.addEventListener('click', () => {
        signOut(auth)
            .catch((error) => {
                displayAuthError(`로그아웃 오류: ${error.message}`);
            });
    });
}