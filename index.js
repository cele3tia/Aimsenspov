// index.js

import { setupSensitivityFinder } from './js/sensitivity-finder.js';
import { setupRouter } from './js/router.js';
import { setupAuthUI } from './js/login-ui.js';
import { setupThemeSelector } from './js/theme-selector.js';
import { setupLanguageSelector } from './js/language-selector.js'; // 새로 추가

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed.");

    setupRouter(); 
    setupSensitivityFinder(); 
    setupAuthUI(); 
    setupThemeSelector(); 
    setupLanguageSelector(); // 새로 추가된 언어 선택기 초기화

    console.log("All JavaScript modules initialized.");
});