// js/sensitivity-finder.js

export function setupSensitivityFinder() {
    const initialSensInput = document.getElementById('initialSens');
    const startSensFinderBtn = document.getElementById('startSensFinderBtn');
    const interactiveStepsDiv = document.getElementById('sensitivityInteractiveSteps');

    let currentBaseSens = 0;
    let currentStepNumber = 0;
    const MAX_EXPLORATION_STEPS = 9;

    function startSensitivityFinder() {
        let initialSens = parseFloat(initialSensInput.value);
        if (isNaN(initialSens) || initialSens <= 0) {
            interactiveStepsDiv.innerHTML = "<p style='text-align:center; color:var(--error-color);'>Enter a valid starting sensitivity (number greater than 0).</p>";
            return;
        }

        const initialLowerOption = Math.max(0.001, initialSens * 0.5);
        const initialHigherOption = initialSens * 1.5;

        interactiveStepsDiv.innerHTML = `
            <div class="sens-step-display">
                <h4>Step 1</h4>
                <p>Initial sensitivity: <strong>${initialSens.toFixed(3)}</strong></p>
                <p>Choose your starting sensitivity:</p>
                <div class="sens-options">
                    <button class="sens-choice-btn lower" data-value="${initialLowerOption.toFixed(3)}">Slower (${initialLowerOption.toFixed(3)})</button>
                    <button class="sens-choice-btn higher" data-value="${initialHigherOption.toFixed(3)}">Faster (${initialHigherOption.toFixed(3)})</button>
                </div>
            </div>
        `;

        const choiceButtons = interactiveStepsDiv.querySelectorAll('.sens-choice-btn');
        choiceButtons.forEach(button => {
            button.addEventListener('click', function() {
                currentBaseSens = parseFloat(this.dataset.value);
                currentStepNumber = 2;
                calculateAndDisplayStep();
            });
        });
    }

    function calculateAndDisplayStep() {
        if (currentStepNumber > MAX_EXPLORATION_STEPS + 1) {
            interactiveStepsDiv.innerHTML = `
                <div class="sens-step-display">
                    <h4>Sensitivity Finder Complete</h4>
                    <p>Final sensitivity: <strong>${currentBaseSens.toFixed(3)}</strong></p>
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

        const currentExplorationStep = currentStepNumber - 1;
        const maxFactor = 0.3;
        const minFactor = 0.1;

        const adjustmentFactor = maxFactor - ((maxFactor - minFactor) / MAX_EXPLORATION_STEPS) * (currentExplorationStep - 1);

        const recommendedLower = Math.max(0.001, currentBaseSens * (1 - adjustmentFactor));
        const recommendedHigher = currentBaseSens * (1 + adjustmentFactor);

        interactiveStepsDiv.innerHTML = `
            <div class="sens-step-display">
                <h4>Step ${currentExplorationStep} / ${MAX_EXPLORATION_STEPS}</h4>
                <p>Current sensitivity: <strong>${currentBaseSens.toFixed(3)}</strong></p>
                <p>Choose your next adjustment (Adjustment: ±${(adjustmentFactor * 100).toFixed(1)}%):</p>
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

    if (startSensFinderBtn && initialSensInput && interactiveStepsDiv) {
        startSensFinderBtn.addEventListener('click', startSensitivityFinder);
    } else {
        console.error("Error: Required DOM elements for sensitivity finder not found.");
    }
}