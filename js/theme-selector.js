// js/theme-selector.js

export function setupThemeSelector() {
    console.log("setupThemeSelector: Starting theme selector setup."); // 디버깅 시작 로그

    const htmlElement = document.documentElement;
    const btnOpenThemeSelector = document.getElementById('btnOpenThemeSelector');
    const themeSelectorPopup = document.getElementById('themeSelectorPopup');
    const selectDarkThemeBtn = document.getElementById('selectDarkTheme');
    const selectLightThemeBtn = document.getElementById('selectLightTheme');
    const closeThemeSelectorBtn = document.getElementById('closeThemeSelector');

    // DOM 요소가 모두 존재하는지 다시 한번 확인
    if (!btnOpenThemeSelector || !themeSelectorPopup || !selectDarkThemeBtn || !selectLightThemeBtn || !closeThemeSelectorBtn) {
        console.error("setupThemeSelector Error: One or more theme selector UI elements not found. Check HTML IDs.");
        return;
    } else {
        console.log("setupThemeSelector: All theme selector buttons found.");
    }

    // 테마 적용 함수
    function applyTheme(theme) {
        console.log(`applyTheme: Attempting to apply theme - ${theme}`); // 테마 적용 시도 로그
        if (theme === 'light') {
            htmlElement.classList.add('light-mode');
            console.log("applyTheme: 'light-mode' class added to html element.");
        } else {
            htmlElement.classList.remove('light-mode');
            console.log("applyTheme: 'light-mode' class removed from html element (applying dark).");
        }
        localStorage.setItem('theme', theme); // 선택된 테마 저장
        console.log(`applyTheme: Theme '${theme}' saved to localStorage.`);
    }

    // 팝업 열기/닫기 함수
    function openThemeSelector() {
        themeSelectorPopup.style.display = 'flex'; // flex로 설정하여 중앙 정렬 (CSS에서 정의)
        console.log("openThemeSelector: Theme selector popup opened.");
    }

    function closeThemeSelector() {
        themeSelectorPopup.style.display = 'none';
        console.log("closeThemeSelector: Theme selector popup closed.");
    }

    // 이벤트 리스너 부착
    btnOpenThemeSelector.addEventListener('click', openThemeSelector);
    console.log("setupThemeSelector: btnOpenThemeSelector event listener attached.");

    closeThemeSelectorBtn.addEventListener('click', closeThemeSelector);
    console.log("setupThemeSelector: closeThemeSelectorBtn event listener attached.");

    selectDarkThemeBtn.addEventListener('click', () => {
        console.log("setupThemeSelector: Dark theme button clicked.");
        applyTheme('dark');
        closeThemeSelector();
    });

    selectLightThemeBtn.addEventListener('click', () => {
        console.log("setupThemeSelector: Light theme button clicked."); // 클릭 로그 확인
        applyTheme('light'); // 'light' 테마 적용 함수 호출
        closeThemeSelector();
    });

    // 페이지 로드 시 저장된 테마 적용
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        console.log(`setupThemeSelector: Found saved theme in localStorage: ${savedTheme}`);
        applyTheme(savedTheme);
    } else {
        console.log("setupThemeSelector: No saved theme found, applying default 'dark' theme.");
        applyTheme('dark'); // 기본값은 다크 모드
    }
}