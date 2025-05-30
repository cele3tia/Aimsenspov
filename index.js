// index.js (메인 진입점 파일)

// 다른 모듈에서 필요한 함수들을 불러옵니다.
// js/firebase-init.js에서 앱 및 인증 객체를 가져옴
import { app, auth } from './js/firebase-init.js'; 
// js/router.js에서 라우터 설정 함수를 가져옴
import { setupRouter } from './js/router.js';
// js/theme-switcher.js에서 테마 스위처 설정 함수를 가져옴
import { setupThemeSwitcher } from './js/theme-switcher.js';
// js/sensitivity-finder.js에서 감도 찾기 도구 설정 함수를 가져옴
import { setupSensitivityFinder } from './js/sensitivity-finder.js';
// js/login-ui.js에서 인증 UI 설정 함수를 가져옴
import { setupAuthUI } from './js/login-ui.js'; 


// HTML 문서가 완전히 로드되고 파싱된 후에 JavaScript 코드를 실행합니다.
document.addEventListener('DOMContentLoaded', function() {
    // 각 기능 모듈의 초기화 함수들을 호출하여 기능을 설정합니다.
    setupRouter(); // 페이지 라우터 기능을 설정합니다.
    setupThemeSwitcher(); // 테마 전환 기능을 설정합니다.
    setupSensitivityFinder(); // 감도 찾기 도구 기능을 설정합니다.
    setupAuthUI(); // 로그인/회원가입 UI 및 관련 인증 기능을 설정합니다.
});