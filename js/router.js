// js/router.js
export function setupRouter() {
    const pageSections = document.querySelectorAll('.page-section');
    const routableNavLinks = document.querySelectorAll('.main-navigation a.nav-button[href]');
    
    function showPageBasedOnHash() {
        const hash = window.location.hash.substring(1) || "home"; 
        const targetPageId = hash + "-page"; 
        
        console.log(`Routing to hash: #${hash}, target ID: ${targetPageId}`);

        pageSections.forEach(section => {
            section.style.display = 'none'; 
        });

        routableNavLinks.forEach(link => { 
            const linkHash = link.getAttribute('href').substring(1); 
            if (linkHash === hash) {
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
            const homePage = document.getElementById('home-page');
            if (homePage) {
                homePage.style.display = 'block';
                console.log("Page not found, redirecting to home-page.");
            }
            const homeLink = document.querySelector('a.nav-button[href="#home"]'); 
            if(homeLink) {
                homeLink.classList.add('active');
            }
            if (window.location.hash !== '#home' && window.location.hash !== '') {
                 history.replaceState(null, '', '#home');
                 console.log("Invalid hash, corrected to #home.");
            }
        }
    }

    routableNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const hash = event.currentTarget.getAttribute('href').substring(1); 
            history.pushState(null, '', `#${hash}`);
            
            console.log(`Link clicked: ${event.currentTarget.id}, Pushing state: #${hash}`);
            showPageBasedOnHash();
        });
    });

    window.addEventListener('hashchange', () => {
        console.log("Hash changed event detected.");
        showPageBasedOnHash();
    });
    
    showPageBasedOnHash(); 
}