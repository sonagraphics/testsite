let currentLesson = null;
let currentQIdx = 0;
let score = 0;
let timeLeft = 10;
let timerObj = null;

// --- AUTH ---
function handleLogin() {
    const name = document.getElementById('username').value;
    if (!name) return;
    document.getElementById('welcome-msg').innerText = "Welcome, " + name;
    showScreen('screen-welcome');
}

// --- MENU ---
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('hidden');
}

// --- NAVIGATION ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Auto-close menu
    document.getElementById('side-menu').classList.remove('open');
    document.getElementById('menu-overlay').classList.add('hidden');

    if (id === 'screen-worlds') renderMap();
    if (id !== 'screen-quiz') clearInterval(timerObj);
}

// --- WORLD MAP RENDERING ---
function renderMap() {
    const container = document.getElementById('worlds-container');
    container.innerHTML = "";

    // Accessing data from data.js
    albanianApp.worlds.forEach(w => {
        const card = document.createElement('div');
        card.className = "world-card";
        card.innerHTML = `
            <div style="font-weight:bold; color:var(--burgundy); font-size:1.2rem;">${w.title}</div>
            <div style="font-size:0.85rem; color:#666; margin-bottom:15px;">Topic: ${w.subtitle}</div>
        `;

        w.lessons.forEach(l => {
            const btn = document.createElement('button');
            btn.className = "btn";
            btn.innerText = l.title;
            btn.onclick = () => startQuiz(l);
            card.appendChild(btn);
        });

        container.appendChild(card);
    });
}

// --- QUIZ TIMER ---
function startTimer() {
    timeLeft = 10;
    updateTimerUI();
    clearInterval(timerObj);
    timerObj = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 0) {
            clearInterval(timerObj);
            checkAnswer(null, currentLesson.questions[currentQIdx].a, null);
        }
    }, 1000);
}

function updateTimerUI() {
    document.getElementById('timer-text').innerText = timeLeft + "s";
    document.getElementById('timer-bar').style.width = (timeLeft * 10) + "%";
}

// --- QUIZ LOGIC ---
function startQuiz(lesson) {
    currentLesson = lesson;
    currentQIdx = 0;
    score = 0;
    showScreen('screen-quiz');
    loadQuestion();
}

function loadQuestion() {
    const qData = currentLesson.questions[currentQIdx];
    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('feedback').innerText = "";
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = "";

    // Shuffle options
    const shuffled = [...qData.options].sort(() => Math.random() - 0.5);

    shuffled.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, qData.a, btn);
        grid.appendChild(btn);
    });
    
    startTimer();
}

function checkAnswer(selected, correct, el) {
    clearInterval(timerObj);
    document.querySelectorAll('.option').forEach(o => o.style.pointerEvents = 'none');

    if (selected === correct) {
        if(el) el.classList.add('correct');
        score += 10;
        document.getElementById('feedback').innerText = "Correct";
    } else {
        if(el) el.classList.add('wrong');
        document.getElementById('feedback').innerText = "Incorrect. Correct: " + correct;
    }

    setTimeout(() => {
        currentQIdx++;
        if (currentQIdx < currentLesson.questions.length) {
            loadQuestion();
        } else {
            document.getElementById('final-score').innerText = "Final Score: " + score;
            showScreen('screen-end');
        }
    }, 2000);
}
