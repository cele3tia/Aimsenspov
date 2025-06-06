// js/language-selector.js

// 언어 팩 정의 (이전과 동일)
const languagePacks = {
    'en': {
        'app_title': 'Aimsenspov',
        'btn_home': 'Home',
        'btn_sens_converter': 'Switch Sensitivity',
        'btn_crosshair_code': 'Crosshair Code',
        'btn_aim_practice': 'Aim Practice',
        'btn_language_settings': 'Language Settings',
        'btn_login_signup': 'Login / Signup',
        'btn_select_theme': 'Select Theme',
        'text_select_feature': 'Please select a feature from the menu above.',
        'text_under_development': 'This feature is currently under development.',
        'sens_finder_title': 'Switch Sensitivity',
        'sens_finder_initial_label': 'Start sensitivity:',
        'sens_finder_start_btn': 'Start',
        'sens_finder_start_hint': 'Please press the Start button.',
        'sens_finder_invalid_input': 'Enter a valid starting sensitivity (number greater than 0).',
        'sens_finder_step_title': 'Step',
        'sens_finder_current_sens': 'Current sensitivity:',
        'sens_finder_adjustment': 'Adjustment:',
        'sens_finder_slower_btn': 'Slower',
        'sens_finder_faster_btn': 'Faster',
        'sens_finder_complete_title': 'Sensitivity Finder Complete',
        'sens_finder_final_sens': 'Final sensitivity:',
        'sens_finder_test_hint': 'Test this sensitivity in your game.',
        'sens_finder_restart_btn': 'Restart',
        'auth_account_title': 'Account',
        'auth_status_logged_in': 'Logged in as:',
        'auth_status_not_logged_in': 'Not logged in.',
        'auth_logout_btn': 'Logout',
        'auth_email_password_title': 'Email & Password',
        'auth_email_placeholder': 'Email address',
        'auth_password_placeholder': 'Password',
        'auth_signup_btn': 'Sign Up',
        'auth_login_btn': 'Login',
        'auth_or_divider': 'OR',
        'auth_quick_access_title': 'Quick Access',
        'auth_google_signin_btn': 'Sign In with Google',
        'auth_guest_signin_btn': 'Continue as Guest',
        'auth_error_password_length': 'Password must be at least 6 characters long.',
        'auth_error_recaptcha_not_loaded': 'reCAPTCHA is not loaded. Please try again or check your internet connection.',
        'auth_error_recaptcha_failed': 'reCAPTCHA verification failed. Please try again.',
        'auth_error_registration': 'Registration Error:',
        'auth_error_login': 'Login Error:',
        'auth_error_google_login': 'Google Login Error:',
        'auth_error_guest_login': 'Guest Login Error:',
        'auth_error_logout': 'Logout Error:',
        'auth_recaptcha_privacy_prefix': 'This site is protected by reCAPTCHA Enterprise and the Google ',
        'auth_recaptcha_privacy_link': 'Privacy Policy',
        'auth_recaptcha_and': ' and ',
        'auth_recaptcha_terms_link': 'Terms of Service',
        'auth_recaptcha_suffix': ' apply.',
        'lang_settings_title': 'Language Settings',
        'lang_settings_select_hint': 'Please select your preferred language below.',
        'lang_settings_open_selector_btn': 'Open Language Selector',
        'lang_selector_title': 'Select Language',
        'lang_option_en': 'English',
        'lang_option_ko': '한국어',
        'theme_selector_title': 'Select Theme',
        'theme_option_dark': 'Dark',
        'theme_option_light': 'Light',
        'btn_close': 'Close',
    },
    'ko': {
        'app_title': 'Aimsenspov',
        'btn_home': '홈',
        'btn_sens_converter': '감도 전환',
        'btn_crosshair_code': '조준점 코드',
        'btn_aim_practice': '에임 연습',
        'btn_language_settings': '언어 설정',
        'btn_login_signup': '로그인 / 회원가입',
        'btn_select_theme': '테마 선택',
        'text_select_feature': '위 메뉴에서 기능을 선택해 주세요.',
        'text_under_development': '이 기능은 현재 개발 중입니다.',
        'sens_finder_title': '감도 전환',
        'sens_finder_initial_label': '시작 감도:',
        'sens_finder_start_btn': '시작',
        'sens_finder_start_hint': '시작 버튼을 눌러주세요.',
        'sens_finder_invalid_input': '0보다 큰 유효한 시작 감도(숫자)를 입력하세요.',
        'sens_finder_step_title': '단계',
        'sens_finder_current_sens': '현재 감도:',
        'sens_finder_adjustment': '조정:',
        'sens_finder_slower_btn': '느리게',
        'sens_finder_faster_btn': '빠르게',
        'sens_finder_complete_title': '감도 찾기 완료',
        'sens_finder_final_sens': '최종 감도:',
        'sens_finder_test_hint': '게임에서 이 감도를 테스트해보세요.',
        'sens_finder_restart_btn': '다시 시작',
        'auth_account_title': '계정',
        'auth_status_logged_in': '로그인됨:',
        'auth_status_not_logged_in': '로그인되지 않음.',
        'auth_logout_btn': '로그아웃',
        'auth_email_password_title': '이메일 & 비밀번호',
        'auth_email_placeholder': '이메일 주소',
        'auth_password_placeholder': '비밀번호',
        'auth_signup_btn': '회원가입',
        'auth_login_btn': '로그인',
        'auth_or_divider': '또는',
        'auth_quick_access_title': '빠른 접속',
        'auth_google_signin_btn': 'Google로 로그인',
        'auth_guest_signin_btn': '게스트로 계속',
        'auth_error_password_length': '비밀번호는 6자 이상이어야 합니다.',
        'auth_error_recaptcha_not_loaded': 'reCAPTCHA가 로드되지 않았습니다. 다시 시도하거나 인터넷 연결을 확인하세요.',
        'auth_error_recaptcha_failed': 'reCAPTCHA 확인에 실패했습니다. 다시 시도하세요.',
        'auth_error_registration': '회원가입 오류:',
        'auth_error_login': '로그인 오류:',
        'auth_error_google_login': 'Google 로그인 오류:',
        'auth_error_guest_login': '게스트 로그인 오류:',
        'auth_error_logout': '로그아웃 오류:',
        'auth_recaptcha_privacy_prefix': '이 사이트는 reCAPTCHA Enterprise와 Google의 ',
        'auth_recaptcha_privacy_link': '개인정보처리방침',
        'auth_recaptcha_and': ' 및 ',
        'auth_recaptcha_terms_link': '서비스 약관',
        'auth_recaptcha_suffix': '의 보호를 받습니다.',
        'lang_settings_title': '언어 설정',
        'lang_settings_select_hint': '선호하는 언어를 아래에서 선택하세요.',
        'lang_settings_open_selector_btn': '언어 선택기 열기',
        'lang_selector_title': '언어 선택',
        'lang_option_en': '영어',
        'lang_option_ko': '한국어',
        'theme_selector_title': '테마 선택',
        'theme_option_dark': '다크',
        'theme_option_light': '라이트',
        'btn_close': '닫기',
    }
};

export function setupLanguageSelector() {
    console.log("setupLanguageSelector: Starting language selector setup."); // 시작 로그

    const htmlElement = document.documentElement;
    const btnOpenLanguageSelector = document.getElementById('btnOpenLanguageSelector');
    const languageSelectorPopup = document.getElementById('languageSelectorPopup');
    const selectLangEnBtn = document.getElementById('selectLangEn');
    const selectLangKoBtn = document.getElementById('selectLangKo');
    const closeLanguageSelectorBtn = document.getElementById('closeLanguageSelector');

    // DOM 요소가 모두 존재하는지 확인
    if (!btnOpenLanguageSelector || !languageSelectorPopup || !selectLangEnBtn || !selectLangKoBtn || !closeLanguageSelectorBtn) {
        console.error("setupLanguageSelector Error: One or more language selector UI elements not found. Check HTML IDs.");
        return;
    } else {
        console.log("setupLanguageSelector: All language selector buttons found."); // 요소 찾음 로그
    }

    // 언어 적용 함수
    function applyLanguage(langCode) {
        console.log(`applyLanguage: Attempting to apply language - ${langCode}`); // 언어 적용 시도 로그
        const currentLangPack = languagePacks[langCode];
        if (!currentLangPack) {
            console.error(`applyLanguage: Language pack for ${langCode} not found.`);
            return;
        }

        // data-lang-key 속성을 가진 모든 요소 업데이트
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (currentLangPack[key] !== undefined) { // 키가 존재하는지 확인
                // 특정 요소에 대한 특수 처리 (예: placeholder)
                if (key === 'auth_email_placeholder' && element.tagName === 'INPUT') {
                    element.placeholder = currentLangPack[key];
                } else if (key === 'auth_password_placeholder' && element.tagName === 'INPUT') {
                    element.placeholder = currentLangPack[key];
                } else {
                    // 일반 텍스트 콘텐츠
                    element.textContent = currentLangPack[key];
                }
            } else {
                console.warn(`applyLanguage: Missing translation key '${key}' for language '${langCode}'.`); // 누락된 키 경고
            }
        });
        
        // reCAPTCHA 정책/약관 링크 처리 (특수 처리 필요) - 텍스트 콘텐츠만 업데이트
        const recaptchaPrivacyPrefix = document.querySelector('[data-lang-key="auth_recaptcha_privacy_prefix"]');
        const recaptchaPrivacyLink = document.querySelector('[data-lang-key="auth_recaptcha_privacy_link"]');
        const recaptchaAnd = document.querySelector('[data-lang-key="auth_recaptcha_and"]');
        const recaptchaTermsLink = document.querySelector('[data-lang-key="auth_recaptcha_terms_link"]');
        const recaptchaSuffix = document.querySelector('[data-lang-key="auth_recaptcha_suffix"]');

        if (recaptchaPrivacyPrefix && recaptchaPrivacyLink && recaptchaAnd && recaptchaTermsLink && recaptchaSuffix) {
            recaptchaPrivacyPrefix.textContent = currentLangPack['auth_recaptcha_privacy_prefix'];
            recaptchaPrivacyLink.textContent = currentLangPack['auth_recaptcha_privacy_link'];
            recaptchaAnd.textContent = currentLangPack['auth_recaptcha_and'];
            recaptchaTermsLink.textContent = currentLangPack['auth_recaptcha_terms_link'];
            recaptchaSuffix.textContent = currentLangPack['auth_recaptcha_suffix'];
        } else {
             console.warn("setupLanguageSelector: reCAPTCHA language elements not fully found for text update."); // reCAPTCHA 요소 누락 경고
        }


        localStorage.setItem('language', langCode); // 선택된 언어 저장
        htmlElement.lang = langCode; // HTML lang 속성 업데이트
        console.log(`applyLanguage: Language set to ${langCode} and saved to localStorage.`); // 언어 적용 완료 로그
    }

    // 팝업 열기/닫기 함수
    function openLanguageSelector() {
        languageSelectorPopup.style.display = 'flex';
        console.log("openLanguageSelector: Language selector popup opened."); // 팝업 열기 로그
    }

    function closeLanguageSelector() {
        languageSelectorPopup.style.display = 'none';
        console.log("closeLanguageSelector: Language selector popup closed."); // 팝업 닫기 로그
    }

    // 이벤트 리스너 부착
    btnOpenLanguageSelector.addEventListener('click', openLanguageSelector);
    console.log("setupLanguageSelector: btnOpenLanguageSelector event listener attached.");

    closeLanguageSelectorBtn.addEventListener('click', closeLanguageSelector);
    console.log("setupLanguageSelector: closeLanguageSelectorBtn event listener attached.");

    selectLangEnBtn.addEventListener('click', () => {
        console.log("setupLanguageSelector: English language button clicked."); // 영어 버튼 클릭 로그
        applyLanguage('en');
        closeLanguageSelector();
    });

    selectLangKoBtn.addEventListener('click', () => {
        console.log("setupLanguageSelector: Korean language button clicked."); // 한국어 버튼 클릭 로그
        applyLanguage('ko'); // 한국어 적용 함수 호출
        closeLanguageSelector();
    });

    // 페이지 로드 시 저장된 언어 또는 기본 언어 적용
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && languagePacks[savedLanguage]) {
        console.log(`setupLanguageSelector: Found saved language in localStorage: ${savedLanguage}`);
        applyLanguage(savedLanguage);
    } else {
        console.log("setupLanguageSelector: No saved language found, applying default 'en' language.");
        applyLanguage('en'); // 기본 언어는 영어
    }
}