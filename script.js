let currentUser = null;
let unlocked = ["1-1"];
let currentQIdx = 0;
let score = 0;
let timeLeft = 10;
let timerObj = null;

// --- LOGIN SYSTEM ---
function handleLogin() {
    const name = document.getElementById('username').value;
    if (!name) return alert("Please enter a name!");
    currentUser = name;
    document.getElementById('user-display').innerText = "👤 " + name;
    document.getElementById('welcome-msg').innerText = `Përshëndetje, ${name}!`;
    showScreen('screen-welcome');
}

// --- NAVIGATION ---
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'screen-worlds') renderMap();
    if (timerObj) clearInterval(timerObj); // Stop timer when moving screens
}

// --- TIMER LOGIC ---
function startTimer() {
    timeLeft = 10;
    updateTimerUI();
    clearInterval(timerObj);
    timerObj = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if (timeLeft <= 0) {
            clearInterval(timerObj);
            checkAnswer(null, null, null); // Auto-fail on timeout
        }
    }, 1000);
}

function updateTimerUI() {
    document.getElementById('timer-text').innerText = timeLeft + "s";
    document.getElementById('timer-bar').style.width = (timeLeft * 10) + "%";
}

// --- MAP RENDERING ---
function renderMap() {
    const container = document.getElementById('worlds-container');
    container.innerHTML = "";
    albanianApp.worlds.forEach(w => {
        const div = document.createElement('div');
        div.style.background = "#f0f0f0";
        div.style.margin = "10px 0";
        div.style.padding = "15px";
        div.style.borderRadius = "15px";
        div.innerHTML = `<strong>${w.icon} ${w.title}</strong><br><small>${w.subtitle}</small>`;
        
        w.lessons.forEach(l => {
            const btn = document.createElement('button');
            btn.className = "btn";
            btn.style.width = "100%";
            btn.innerText = l.title;
            btn.onclick = () => startQuiz(l);
            div.appendChild(btn);
        });
        container.appendChild(div);
    });
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
    const q = currentLesson.questions[currentQIdx];
    document.getElementById('question-text').innerText = q.q;
    document.getElementById('feedback').innerText = "";
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = "";

    // Shuffle answers
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);

    shuffled.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerText = opt;
        div.onclick = () => checkAnswer(opt, q.a, div);
        grid.appendChild(div);
    });
    
    startTimer();
}

function checkAnswer(selected, correct, el) {
    clearInterval(timerObj);
    const options = document.querySelectorAll('.option');
    options.forEach(o => o.style.pointerEvents = 'none');

    if (selected === correct) {
        el.classList.add('correct');
        score += 10;
        document.getElementById('feedback').innerText = "Sakërt! (Correct!)";
    } else {
        if(el) el.classList.add('wrong');
        document.getElementById('feedback').innerText = selected === null ? "Time is up!" : "Gabim! It was: " + correct;
    }

    setTimeout(() => {
        currentQIdx++;
        if (currentQIdx < currentLesson.questions.length) loadQuestion();
        else {
            document.getElementById('final-score').innerText = `Total Score: ${score}`;
            showScreen('screen-end');
        }
    }, 2000);
}

function toggleMenu() { /* Menu logic... */ }
