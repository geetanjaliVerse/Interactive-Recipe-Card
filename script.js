const toggleIngredientsBtn = document.getElementById('toggleIngredients');
const toggleStepsBtn = document.getElementById('toggleSteps');
const startCookingBtn = document.getElementById('startCooking');
const nextStepBtn = document.getElementById('nextStep');
const resetPageBtn = document.getElementById('resetPage');
const printRecipeBtn = document.getElementById('printRecipe');
const ingredientsSection = document.getElementById('ingredients');
const stepsSection = document.getElementById('steps');
const progressBar = document.getElementById('progressBar');
const stepList = document.querySelectorAll('#stepList li');
const timerDisplay = document.getElementById('timer');

let currentStep = 0;
let timerInterval;
let totalTime = 2700; // 45 minutes in seconds

// Toggle Ingredients
toggleIngredientsBtn.addEventListener('click', () => {
  ingredientsSection.classList.toggle('hidden');
  toggleIngredientsBtn.textContent = ingredientsSection.classList.contains('hidden')
    ? 'Show Ingredients' : 'Hide Ingredients';
});

// Toggle Steps
toggleStepsBtn.addEventListener('click', () => {
  stepsSection.classList.toggle('hidden');
  toggleStepsBtn.textContent = stepsSection.classList.contains('hidden')
    ? 'Show Steps' : 'Hide Steps';
});

// Start Cooking
startCookingBtn.addEventListener('click', () => {
  if (stepsSection.classList.contains('hidden')) {
    stepsSection.classList.remove('hidden');
  }
  startTimer();
  currentStep = 0;
  stepList.forEach(step => step.style.background = '');
  highlightStep(currentStep);
  nextStepBtn.classList.remove('hidden');
  updateProgress();
});

// Next Step
nextStepBtn.addEventListener('click', () => {
  if (currentStep < stepList.length - 1) {
    currentStep++;
    highlightStep(currentStep);
    updateProgress();
  } else {
    nextStepBtn.textContent = "Done!";
    progressBar.style.width = "100%";
    clearInterval(timerInterval);
    setTimeout(() => {
      alert("🎉 Congratulations! Your Chocolate Cake is ready! 🍰");
      resetPageBtn.classList.remove('hidden');
      nextStepBtn.classList.add('hidden');
    }, 300);
  }
});

// Reset Page
resetPageBtn.addEventListener('click', () => {
  location.reload();
});

// Print Recipe
printRecipeBtn.addEventListener('click', () => {
  window.print();
});

function highlightStep(index) {
  stepList.forEach((step, i) => {
    step.style.background = i === index ? '#1e40af' : '';
  });
}

function updateProgress() {
  let progress = ((currentStep + 1) / stepList.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Timer
function startTimer() {
  timerDisplay.classList.remove('hidden');
  let remainingTime = totalTime;
  updateTimerDisplay(remainingTime);

  timerInterval = setInterval(() => {
    remainingTime--;
    updateTimerDisplay(remainingTime);
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      alert("⏰ Time's up! Check your cake!");
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  timerDisplay.textContent = `⏱️ Time Remaining: ${minutes}m ${secs < 10 ? '0' + secs : secs}s`;
}
