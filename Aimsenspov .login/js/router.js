export function setupRouter() {
    const pageSections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.main-navigation a.nav-button');

    function showPageBasedOnHash() {
        const hash = window.location.hash.substring(1) || "home"; 
        const targetPageId = hash + "-page"; 

        pageSections.forEach(section => {
            section.style.display = 'none'; 
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + hash) {
                link.classList.add('active'); 
            } else {
                link.classList.remove('active');
            }
        });

        const pageToShow = document.getElementById(targetPageId);
        if (pageToShow) {
            pageToShow.style.display = 'block'; 
        } else {
            const homePage = document.getElementById('home-page');
            if (homePage) {
                 homePage.style.display = 'block';
            }
            const homeLink = document.querySelector('a.nav-button[href="#home"]');
            if(homeLink) {
                homeLink.classList.add('active');
            }
        }
    }

    window.addEventListener('hashchange', showPageBasedOnHash);
    showPageBasedOnHash(); 
}