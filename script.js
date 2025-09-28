// Stopwatch variables
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timer = null;
let isRunning = false;

// DOM elements
const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const themeToggleBtn = document.getElementById("theme-toggle");
const lapsList = document.getElementById("laps");
const playIcon = document.getElementById('icon-play');
const pauseIcon = document.getElementById('icon-pause');

// Format time
function formatTime(unit, digits = 2) {
  return unit.toString().padStart(digits, "0");
}

// Update display
function updateDisplay() {
  display.textContent =
    `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds, 3)}`;
}

// Start timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      milliseconds += 10;
      if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 10);
    // update button UI to "Stop"
    if (playIcon && pauseIcon) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline-block';
    }
    startBtn.classList.add('running');
    startBtn.setAttribute('aria-pressed', 'true');
    startBtn.querySelector('.btn-text').textContent = 'Stop';
  }
}

function stopTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    // update button UI to "Start"
    if (playIcon && pauseIcon) {
      playIcon.style.display = 'inline-block';
      pauseIcon.style.display = 'none';
    }
    startBtn.classList.remove('running');
    startBtn.setAttribute('aria-pressed', 'false');
    startBtn.querySelector('.btn-text').textContent = 'Start';
  }
}

// Reset timer
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  hours = minutes = seconds = milliseconds = 0;
  updateDisplay();
  lapsList.innerHTML = "";
}

// Lap
function recordLap() {
  if (isRunning) {
    const li = document.createElement("li");
    const left = document.createElement('span');
    left.className = 'lap-label';
    left.textContent = `Lap ${lapsList.children.length + 1}`;
    const right = document.createElement('span');
    right.className = 'lap-time';
    right.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(milliseconds,3)}`;
    li.appendChild(left);
    li.appendChild(right);
    lapsList.appendChild(li);
  }
}

// Theme toggle
function toggleTheme() {
  const moon = document.getElementById('icon-moon');
  const sun = document.getElementById('icon-sun');
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  // show/hide SVG icons
  if (moon && sun) {
    moon.style.display = isLight ? 'none' : 'inline-block';
    sun.style.display = isLight ? 'inline-block' : 'none';
  }
  themeToggleBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
}

// Event listeners
// Toggle start/stop when the single button is clicked
startBtn.addEventListener('click', () => {
  if (isRunning) stopTimer(); else startTimer();
});
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
themeToggleBtn.addEventListener("click", toggleTheme);


// Set initial icon visibility for theme toggle
const initialMoon = document.getElementById('icon-moon');
const initialSun = document.getElementById('icon-sun');
if (initialMoon && initialSun) {
  const isLight = document.body.classList.contains('light-mode');
  initialMoon.style.display = isLight ? 'none' : 'inline-block';
  initialSun.style.display = isLight ? 'inline-block' : 'none';
  themeToggleBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
}

// Initialize
updateDisplay();
