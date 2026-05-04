let currentUser = "";
let currentLesson = null;
let currentQIdx = 0;
let score = 0;
let timeLeft = 10;
let timerObj = null;

// --- LOGIN ---
function handleLogin() {
    const name = document.getElementById('username').value;
    if (!name) return alert("Please enter your name!");
    currentUser = name;
    document.getElementById('user-display').innerText = name;
    document.getElementById('welcome-msg').innerText = `Përshëndetje, ${name}!`;
    showScreen('screen-welcome');
}

// --- MENU & NAVIGATION ---
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('hidden');
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Close menu if moving screens
    document.getElementById('side-menu').classList.remove('open');
    document.getElementById('menu-overlay').classList.add('hidden');

    if (id === 'screen-worlds') renderMap();
    if (id !== 'screen-quiz') clearInterval(timerObj);
}

// --- WORLD MAP ---
function renderMap() {
    const container = document.getElementById('worlds-container');
    container.innerHTML = "";

    albanianApp.worlds.forEach(w => {
        const worldBox = document.createElement('div');
        worldBox.style.cssText = "background:#fff; border:2px solid #eee; border-radius:20px; padding:20px; margin-bottom:20px; text-align:left;";
        
        worldBox.innerHTML = `
            <div style="font-size:0.8rem; color:var(--primary); font-weight:bold;">${w.subtitle.toUpperCase()}</div>
            <div style="font-size:1.4rem; font-weight:bold; margin:5px 0;">${w.icon} ${w.title}</div>
            <div style="font-size:0.85rem; color:#666; margin-bottom:15px;">Guide: ${w.character}</div>
        `;

        w.lessons.forEach(l => {
            const lBtn = document.createElement('button');
            lBtn.className = "btn";
            lBtn.style.width = "100%";
            lBtn.innerText = "Start: " + l.title;
            lBtn.onclick = () => startQuiz(l);
            worldBox.appendChild(lBtn);
        });

        container.appendChild(worldBox);
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

    // Shuffle options so correct answer isn't always at the same spot
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

function checkAnswer(selected, correct, element) {
    clearInterval(timerObj);
    document.querySelectorAll('.option').forEach(o => o.style.pointerEvents = 'none');

    const feedbackEl = document.getElementById('feedback');

    if (selected === correct) {
        if (element) element.classList.add('correct');
        score += 10;
        const cheers = albanianApp.feedback.correct;
        feedbackEl.innerText = cheers[Math.floor(Math.random() * cheers.length)];
        feedbackEl.style.color = "#00b894";
    } else {
        if (element) element.classList.add('wrong');
        const oops = albanianApp.feedback.wrong;
        let msg = oops[Math.floor(Math.random() * oops.length)];
        feedbackEl.innerText = msg.replace("[ANS]", correct);
        feedbackEl.style.color = "var(--secondary)";
    }

    setTimeout(() => {
        currentQIdx++;
        if (currentQIdx < currentLesson.questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }, 2000);
}

function finishQuiz() {
    document.getElementById('final-score').innerText = `You earned ${score} points!`;
    showScreen('screen-end');
}
