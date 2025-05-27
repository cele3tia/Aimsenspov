// index.js
document.addEventListener('DOMContentLoaded', function() {
    
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


    const initialSensInput = document.getElementById('initialSens');
    const startSensFinderBtn = document.getElementById('startSensFinderBtn');
    const interactiveStepsDiv = document.getElementById('sensitivityInteractiveSteps');

    let currentBaseSens = 0;
    let currentStepNumber = 0;
    const MAX_STEPS = 9; 

    function calculateAndDisplayStep() {
        if (currentStepNumber > MAX_STEPS) {
            interactiveStepsDiv.innerHTML = `
                <div class="sens-step-display">
                    <h4>Sensitivity Finder Complete! (${MAX_STEPS} Steps)</h4>
                    <p>Final Base Sensitivity explored: <strong>${currentBaseSens.toFixed(3)}</strong></p>
                    <p>Test this sensitivity in your game.</p>
                    <button id="restartSensFinderBtn">Restart</button>
                </div>
            `;
            const restartBtn = document.getElementById('restartSensFinderBtn');
            if (restartBtn) {
                 restartBtn.addEventListener('click', startSensitivityFinder);
            }
            return;
        }

        const recommendedLower = Math.max(0.001, currentBaseSens * 0.7); 
        const recommendedHigher = Math.max(0.001, currentBaseSens * 1.3);

        interactiveStepsDiv.innerHTML = `
            <div class="sens-step-display">
                <h4>Step ${currentStepNumber} / ${MAX_STEPS}</h4>
                <p>Current Base: <strong>${currentBaseSens.toFixed(3)}</strong></p>
                <p>Select your next Base sensitivity:</p>
                <div class="sens-options">
                    <button class="sens-choice-btn lower" data-value="${recommendedLower.toFixed(3)}">Slower (${recommendedLower.toFixed(3)})</button>
                    <button class="sens-choice-btn higher" data-value="${recommendedHigher.toFixed(3)}">Faster (${recommendedHigher.toFixed(3)})</button>
                </div>
            </div>
        `;

        const choiceButtons = interactiveStepsDiv.querySelectorAll('.sens-choice-btn');
        choiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentBaseSens = parseFloat(this.dataset.value); 
                currentStepNumber++;
                calculateAndDisplayStep(); 
            });
        });
    }

    function startSensitivityFinder() {
        let initialSens = parseFloat(initialSensInput.value);
        if (isNaN(initialSens) || initialSens <= 0) {
            interactiveStepsDiv.innerHTML = "<p style='color: #ff6b6b; text-align:center;'>Please enter a valid starting sensitivity (number greater than 0).</p>";
            return;
        }
        currentBaseSens = initialSens;
        currentStepNumber = 1;
        calculateAndDisplayStep(); 
    }

    if (startSensFinderBtn && initialSensInput && interactiveStepsDiv) {
        startSensFinderBtn.addEventListener('click', startSensitivityFinder);
    }
});
