// js/router.js
export function setupRouter() {
    const pageSections = document.querySelectorAll('.page-section');
    // href 속성이 있는 .nav-button만 선택하여 라우터가 처리하도록 명확히 지정
    const routableNavLinks = document.querySelectorAll('.main-navigation a.nav-button[href]');
    
    function showPageBasedOnHash() {
        const hash = window.location.hash.substring(1) || "home"; 
        const targetPageId = hash + "-page"; 
        
        console.log(`Routing to hash: #${hash}, target ID: ${targetPageId}`);

        // 모든 페이지 섹션 숨기기
        pageSections.forEach(section => {
            section.style.display = 'none'; 
        });

        // 내비게이션 링크의 활성 상태 업데이트 (라우터가 처리하는 링크만)
        routableNavLinks.forEach(link => { 
            if (link.getAttribute('href') === '#' + hash) {
                link.classList.add('active'); 
                console.log(`Active class added to: ${link.id}`);
            } else {
                link.classList.remove('active');
            }
        });

        const pageToShow = document.getElementById(targetPageId);
        if (pageToShow) {
            pageToShow.style.display = 'block'; 
            console.log(`Displaying page: ${targetPageId}`);
        } else {
            // 존재하지 않는 해시이거나 기본값일 경우 홈 페이지 표시
            const homePage = document.getElementById('home-page');
            if (homePage) {
                homePage.style.display = 'block';
                console.log("Page not found, redirecting to home-page.");
            }
            const homeLink = document.querySelector('a.nav-button[href="#home"]');
            if(homeLink) {
                homeLink.classList.add('active');
            }
            // URL 해시가 유효하지 않거나 비어있을 경우 #home으로 리다이렉트
            if (window.location.hash !== '#home' && window.location.hash !== '') {
                 history.replaceState(null, '', '#home');
                 console.log("Invalid hash, corrected to #home.");
            }
        }
    }

    // routableNavLinks (href 속성 있는 버튼)에만 클릭 이벤트 리스너 설정
    routableNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // 라우터가 처리하는 링크는 기본 동작 방지
            const hash = event.currentTarget.getAttribute('href').substring(1);
            history.pushState(null, '', `#${hash}`);
            console.log(`Link clicked: ${event.currentTarget.id}, Pushing state: #${hash}`);
            showPageBasedOnHash();
        });
    });

    // 브라우저의 뒤로 가기/앞으로 가기 버튼 처리
    window.addEventListener('hashchange', () => {
        console.log("Hash changed event detected.");
        showPageBasedOnHash();
    });
    
    // 페이지 로드 시 초기 페이지 설정
    console.log("Router setup complete. Initial page load.");
    showPageBasedOnHash(); 
}