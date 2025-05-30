// js/theme-switcher.js

export function setupThemeSwitcher() {
    // 이 변수들을 함수 안으로 옮겨, setupThemeSwitcher가 호출될 때 (DOM이 준비된 후) 요소를 찾도록 합니다.
    const htmlElement = document.documentElement; 
    const themeToggleBtn = document.getElementById('btnThemeToggle');

    // 테마를 적용하는 함수
    function applyTheme(theme) {
        if (theme === 'light') {
            htmlElement.classList.add('light-mode');
        } else {
            htmlElement.classList.remove('light-mode');
        }
    }

    // 테마를 전환하는 함수
    function toggleTheme() {
        let currentTheme = htmlElement.classList.contains('light-mode') ? 'light' : 'dark';
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme); // 사용자 선호도 저장
    }

    // 페이지 로드 시 저장된 테마 적용
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // 저장된 테마가 없으면 기본으로 다크 모드 적용
        applyTheme('dark'); 
    }

    // 테마 토글 버튼에 이벤트 리스너 연결
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    } else {
        // 콘솔에 오류 메시지 출력 (버튼을 찾지 못했을 경우 디버깅용)
        console.error("Error: Theme toggle button (#btnThemeToggle) not found in the HTML.");
    }
}