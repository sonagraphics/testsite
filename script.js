console.log("data.js loaded");

// / Global State
let currentWorld = 0;
let currentLesson = 0;
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

/**
 * UI: Toggles the sidebar navigation menu
 */
function toggleMenu() {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");
    
    if (menu && overlay) {
        menu.classList.toggle("open");
        overlay.classList.toggle("hidden");
    }
}

/**
 * Navigation: Switches between different app screens
 */
function showScreen(id) {
    console.log("Switching to screen:", id);

    document.querySelectorAll(".screen").forEach(s => {
        s.classList.remove("active");
        s.style.display = "none";
    });

    const screen = document.getElementById(id);
    if (!screen) {
        console.error("Screen ID not found:", id);
        return;
    }

    screen.classList.add("active");
    screen.style.display = "flex";

    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("menu-overlay");
    if (menu) menu.classList.remove("open");
    if (overlay) overlay.classList.add("hidden");

    if (id === 'screen-worlds') {
        renderWorlds();
    }
}

/**
 * UI: Builds the "Lesson Map"
 */
function renderWorlds() {
    const container = document.getElementById("worlds-container");
    
    if (!window.albanianApp || !window.albanianApp.worlds) {
        console.error("Data.js is missing or not loaded!");
        container.innerHTML = `<div style="text-align: center;"><p>⚠️ Data not found.</p></div>`;
        return;
    }

    const worldsData = window.albanianApp.worlds;
    container.innerHTML = ""; 

    worldsData.forEach((world, i) => {
        const worldCard = document.createElement("div");
        worldCard.className = "world-card";
        
        worldCard.innerHTML = `
            <div class="world-card-header">
                <div class="world-icon">${world.icon}</div>
                <div class="world-info">
                    <div class="world-title">${world.title}</div>
                    <div class="world-subtitle">${world.subtitle}</div>
                </div>
            </div>
        `;

        world.lessons.forEach((lesson, j) => {
            const btn = document.createElement("button");
            btn.className = "lesson-pill";
            btn.textContent = lesson.title;
            btn.onclick = () => startLesson(i, j);
            worldCard.appendChild(btn);
        });

        container.appendChild(worldCard);
    });
}

/**
 * Quiz Logic
 */
function startLesson(w, l) {
    if (!window.albanianApp?.worlds) {
        alert("Game data failed to load. Check data.js file.");
        return;
    }

    currentWorld = w;
    currentLesson = l;
    currentQuestion = 0;
    score = 0;

    showScreen("screen-quiz");
    setTimeout(loadQuestion, 50);
}

function loadQuestion() {
    const worldsData = window.albanianApp.worlds;
    const lessonData = worldsData[currentWorld].lessons[currentLesson];
    const question = lessonData.questions[currentQuestion];

    document.getElementById("question-text").innerText = question.q;
    
    const qNum = document.getElementById("question-num");
    if (qNum) qNum.innerText = `Question ${currentQuestion + 1}`;

    const answers = document.getElementById("options-grid");
    answers.innerHTML = "";

    question.options.forEach(opt => {
        const btn = document.createElement("div");
        btn.className = "option";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, question.a, btn);
        answers.appendChild(btn);
    });

    startTimer();
}

function checkAnswer(selected, correct, el) {
    clearInterval(timer); 
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.style.pointerEvents = 'none'); 

    if (selected === correct) {
        el.classList.add("correct");
        score += 10;
    } else {
        el.classList.add("wrong");
    }
    setTimeout(nextQuestion, 700);
}

function nextQuestion() {
    const worldsData = window.albanianApp.worlds;
    const currentQuestions = worldsData[currentWorld].lessons[currentLesson].questions;

    currentQuestion++;

    if (currentQuestion < currentQuestions.length) {
        loadQuestion();
    } else {
        const finalScoreLabel = document.getElementById("final-score-num");
        if (finalScoreLabel) finalScoreLabel.innerText = score;
        showScreen("screen-end");
    }
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    const bar = document.getElementById("timer-bar");
    const text = document.getElementById("timer-text");

    timer = setInterval(() => {
        timeLeft--;
        if (text) text.innerText = timeLeft + "s";
        if (bar) bar.style.width = (timeLeft / 10) * 100 + "%";
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

// --- STREAK LOGIC ---
function checkIn(dayIndex) {
    const days = document.querySelectorAll('.day-item');
    if (!days[dayIndex]) return;

    days[dayIndex].classList.toggle('completed');
    
    const msg = document.getElementById('streak-msg');
    const totalCompleted = document.querySelectorAll('.day-item.completed').length;
    
    if (msg) {
        msg.innerText = totalCompleted > 0 ? `🔥 ${totalCompleted} day streak!` : "🔥 Keep your streak alive!";
    }
    
    saveStreak();
}

function saveStreak() {
    const completedDays = [];
    document.querySelectorAll('.day-item').forEach((day, index) => {
        if (day.classList.contains('completed')) {
            completedDays.push(index);
        }
    });
    localStorage.setItem('albanianStreak', JSON.stringify(completedDays));
}

/**
 * INITIALIZE EVERYTHING ON LOAD
 */
window.addEventListener('load', () => {
    // 1. Show the first screen
    showScreen("screen-welcome");

    // 2. Load the streak from memory
    const saved = JSON.parse(localStorage.getItem('albanianStreak') || "[]");
    const days = document.querySelectorAll('.day-item');
    saved.forEach(index => {
        if(days[index]) days[index].classList.add('completed');
    });

    // 3. Update the streak message based on saved data
    const msg = document.getElementById('streak-msg');
    if (msg && saved.length > 0) {
        msg.innerText = `🔥 ${saved.length} day streak!`;
    }
});
document.querySelectorAll('.day-item').forEach(day => {
    day.addEventListener('click', () => {
        const index = parseInt(day.getAttribute('data-day'));
        checkIn(index);
    });
});
