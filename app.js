const translations = {
    uz: { title: "Fokus Rejimi", start: "Boshlash", pause: "To'xtatish", resume: "Davom etish", reset: "Qayta tiklash" },
    en: { title: "Focus Mode", start: "Start", pause: "Pause", resume: "Resume", reset: "Reset" },
    ru: { title: "Фокус", start: "Старт", pause: "Пауза", resume: "Продолжить", reset: "Сброс" }
};
const quotes = [
    "Diqqatni jamla, natija yaqin!",
    "Kichik qadamlar katta muvaffaqiyatga yetaklaydi.",
    "Hozir mehnat qil, keyin rohatlan.",
    "Chalg'ima, sening vaqting qimmat!"
];

function showRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
 
    document.getElementById('quote').textContent = randomQuote;
}
let currentLang = 'uz';

function changeLang(lang) {
    currentLang = lang;
    document.querySelector('.badge').textContent = translations[lang].title;
    document.getElementById('reset-btn').textContent = translations[lang].reset;
    updateButtonText();
}
const state = {
    timeLeft: parseInt(localStorage.getItem('savedTime')) || 25 * 60,
    timerId: null,
    isActive: false,
    initialDuration: (parseInt(document.getElementById('focus-time').value) || 25) * 60
};


const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const timeInput = document.getElementById('focus-time');
const progressFill = document.getElementById('progress-line');


function updateDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;

document.title = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} - Focus Mode`;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const currentTotal = (timeInput.value || 25) * 60;
    const percentage = (state.timeLeft / currentTotal) * 100;
    progressFill.style.width = `${percentage}%`;

    localStorage.setItem('savedTime', state.timeLeft);
}


function pauseTimer() {
    clearInterval(state.timerId);
    state.timerId = null;
    state.isActive = false;
    
    startBtn.textContent = "Resume";
    startBtn.classList.remove('active'); 


function startTimer() {
    if (state.isActive) return;

    state.isActive = true;
    startBtn.textContent = "Pause";

    state.timerId = setInterval(() => {
        if (state.timeLeft > 0) {
            state.timeLeft--;
            updateDisplay();
        } else {
            finishSession();
        }
    }, 1000);
}


function finishSession() {
    pauseTimer();
    alert("Vaqt tugadi! Ajoyib natija! Endi biroz dam oling.");
    state.timeLeft = (timeInput.value || 25) * 60;
    startBtn.textContent = "Start";
    updateDisplay();
