let unlockedLessons = ["1-1"];
let score = 0;
let streak = 0;
let lastCheckIn = "";
let currentLesson = null;
let currentQIdx = 0;
let timerInterval;

function loadMemory() {
    const saved = localStorage.getItem('eraData');
    if (saved) {
        const data = JSON.parse(saved);
        unlockedLessons = data.unlocked || ["1-1"];
        streak = data.streak || 0;
        lastCheckIn = data.lastCheckIn || "";
    }
}

function saveMemory() {
    localStorage.setItem('eraData', JSON.stringify({
        unlocked: unlockedLessons,
        streak: streak,
        lastCheckIn: lastCheckIn
    }));
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'screen-worlds') renderMap();
    if (id === 'screen-welcome') updateStreakUI();
}

function renderMap() {
    const container = document.getElementById('worlds-container');
    container.innerHTML = "";
    albanianApp.worlds.forEach(world => {
        const worldDiv = document.createElement('div');
        worldDiv.className = 'world-section';
        worldDiv.innerHTML = `<h3>${world.title}: ${world.subtitle} <small>(${world.character})</small></h3>`;
        
        const scroll = document.createElement('div');
        scroll.className = 'lessons-scroll';
        
        world.lessons.forEach(lesson => {
            const unlocked = unlockedLessons.includes(lesson.id);
            const card = document.createElement('div');
            card.className = `lesson-card ${unlocked ? '' : 'locked'}`;
            card.innerHTML = `<div class="lesson-icon">${world.icon}</div><div class="lesson-name">${lesson.title}</div>`;
            if (unlocked) card.onclick = () => startQuiz(lesson);
            scroll.appendChild(card);
        });
        worldDiv.appendChild(scroll);
        container.appendChild(worldDiv);
    });
}

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
    const grid = document.getElementById('options-grid');
    grid.innerHTML = "";
    qData.options.forEach(opt => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.innerText = opt;
        btn.onclick = () => checkAns(opt, qData.a, btn);
        grid.appendChild(btn);
    });
}

function checkAns(selected, correct, element) {
    if (selected === correct) {
        element.classList.add('correct');
        score += 10;
        const msg = albanianApp.feedback.correct[Math.floor(Math.random() * albanianApp.feedback.correct.length)];
        document.getElementById('feedback').innerText = msg;
    } else {
        element.classList.add('wrong');
        let msg = albanianApp.feedback.wrong[Math.floor(Math.random() * albanianApp.feedback.wrong.length)];
        document.getElementById('feedback').innerText = msg.replace("[ANS]", correct);
    }
    
    setTimeout(() => {
        currentQIdx++;
        if (currentQIdx < currentLesson.questions.length) loadQuestion();
        else finishQuiz();
    }, 1500);
}

function finishQuiz() {
    document.getElementById('final-score').innerText = `You scored ${score} points!`;
    showScreen('screen-end');
}

function updateStreakUI() {
    document.getElementById('streak-count').innerText = streak;
    // Logic to change icon based on albanianApp.streaks goes here
}

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('open');
    document.getElementById('menu-overlay').classList.toggle('hidden');
}

window.onload = () => {
    loadMemory();
    updateStreakUI();
};
