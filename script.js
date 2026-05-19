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
        container.innerHTML = `<p>⚠️ Data not found.</p>`;
        return;
    }

    const worldsData = window.albanianApp.worlds;
    container.innerHTML = "";

    const sections = [
        {
            title: "🟢 Basic",
            start: 0,
            end: 3
        },
        {
            title: "🟡 Medium",
            start: 4,
            end: 6
        },
        {
            title: "🔴 Hard",
            start: 7,
            end: 9
        }
    ];

    sections.forEach(section => {
        const heading = document.createElement("h3");
        heading.className = "difficulty-title";
        heading.innerText = section.title;
        container.appendChild(heading);

        worldsData.slice(section.start, section.end + 1).forEach((world, index) => {

            const realIndex = section.start + index;

            const unlocked = realIndex === 0 || localStorage.getItem(`lesson-${realIndex - 1}-done`);

            const worldCard = document.createElement("div");
            worldCard.className = unlocked ? "world-card" : "world-card locked";

            worldCard.innerHTML = `
                <div class="world-card-header">
                    <div class="world-icon ${!unlocked ? 'locked-icon' : ''}">
                        ${world.icon}
                    </div>

                    <div class="world-info">
                        <div class="world-title">${world.title}</div>
                        <div class="world-subtitle">${world.subtitle}</div>
                    </div>

                    ${!unlocked ? `<div class="world-lock">🔒</div>` : ""}
                </div>
            `;

            world.lessons.forEach((lesson, j) => {
                const btn = document.createElement("button");

           btn.className = unlocked
    ? "lesson-pill"
    : "lesson-pill locked-pill";
                btn.innerHTML = `
                    <span>${lesson.title}</span>
                    <span class="lesson-badge ${!unlocked ? 'locked-badge' : ''}">
                        ${unlocked ? 'PLAY' : 'LOCK'}
                    </span>
                `;

                if (unlocked) {
                    btn.onclick = () => startLesson(realIndex, j);
                }

                worldCard.appendChild(btn);
            });

            container.appendChild(worldCard);
        });
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
    document.getElementById("feedback").innerText = "";

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

    options.forEach(opt => {
        opt.style.pointerEvents = 'none';

        if (opt.innerText === correct) {
            opt.classList.add("correct");
        }
    });

    const feedback = document.getElementById("feedback");

    if (selected === correct) {

        el.classList.add("correct");

        score += 10;

        const messages = window.albanianApp.feedback.correct;

        feedback.innerText =
            messages[Math.floor(Math.random() * messages.length)];

    } else {

        el.classList.add("wrong");

        const messages = window.albanianApp.feedback.wrong;

        feedback.innerText =
            messages[Math.floor(Math.random() * messages.length)]
            .replace("[ANS]", correct);
    }

    document.getElementById("quiz-score-badge").innerText = `${score} XP`;

    setTimeout(nextQuestion, 1400);
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
        localStorage.setItem(`lesson-${currentWorld}-done`, true);
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

    const today = new Date().getDay();

    // Convert JS Sunday-first → Monday-first
    const adjustedToday = today === 0 ? 6 : today - 1;

    if (dayIndex !== adjustedToday) return;

    const days = document.querySelectorAll('.day-item');

    days.forEach(day => day.classList.remove('completed'));

    days[dayIndex].classList.add('completed');

    localStorage.setItem('today-checkin', dayIndex);

    const msg = document.getElementById('streak-msg');

    if (msg) {
        msg.innerText = "🔥 Great job practicing today!";
    }
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
document.getElementById("next-lesson-btn").addEventListener("click", () => {
    const worlds = window.albanianApp.worlds;

    let nextWorld = currentWorld;
    let nextLesson = currentLesson + 1;

    // Move to next world if no more lessons
    if (nextLesson >= worlds[currentWorld].lessons.length) {
        nextWorld++;
        nextLesson = 0;
    }

    // If no more worlds → go back to map
    if (nextWorld >= worlds.length) {
        showScreen("screen-worlds");
        return;
    }

    startLesson(nextWorld, nextLesson);
});

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
const startBtn = document.getElementById("start-adventure");

if (startBtn) {
    startBtn.addEventListener("click", () => {
        showScreen("screen-worlds");
    });
}
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


