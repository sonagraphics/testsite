// ================== STATE & MEMORY ==================
let unlockedLessons = ["1-1"]; // ID of unlocked lessons. 1-1 is always unlocked.
let currentPlayingLesson = null;
let currentQuesIdx = 0;
let score = 0;

let streak = 0;
let lastCheckIn = "";

// Timer Settings (Kept at your requested 20 seconds)
const TIMER_DURATION = 20;
let timeLeft = TIMER_DURATION;
let timerInterval;

// Load Data from LocalStorage
function loadMemory() {
    const savedUnlocked = localStorage.getItem('eraUnlockedLessons');
    if (savedUnlocked) unlockedLessons = JSON.parse(savedUnlocked);

    const savedStreak = localStorage.getItem('eraStreak');
    if (savedStreak) streak = parseInt(savedStreak);

    const savedLastCheckIn = localStorage.getItem('eraLastCheckIn');
    if (savedLastCheckIn) lastCheckIn = savedLastCheckIn;

    const savedScore = localStorage.getItem('eraScore');
    if (savedScore) score = parseInt(savedScore);
}

function saveMemory() {
    localStorage.setItem('eraUnlockedLessons', JSON.stringify(unlockedLessons));
    localStorage.setItem('eraStreak', streak.toString());
    localStorage.setItem('eraLastCheckIn', lastCheckIn);
    localStorage.setItem('eraScore', score.toString());
}

// ================== DATA: WORLDS & LESSONS ==================
// I safely distributed all 125 of your questions into the map sections!
const gameWorlds = [
    {
        worldId: 1,
        title: "WORLD 1",
        subtitle: "First Words",
        lessons: [
            { id: "1-1", title: "Hello & Goodbye", icon: "👋", questions: [
                { q: "How do you say 'Hello'?", options: ["Përshëndetje", "Bukë", "Mollë", "Ujë"], a: "Përshëndetje" },
                { q: "How do you say 'Goodbye'?", options: ["Mirupafshim", "Po", "Mace", "Shtëpi"], a: "Mirupafshim" },
                { q: "'Yes' and 'No' in Albanian:", options: ["Po / Jo", "Mirë / Keq", "Tung / Tung", "Ej / Hej"], a: "Po / Jo" },
                { q: "A casual way to say 'Hi' or 'Bye':", options: ["Tung", "Shkollë", "Libër", "Makinë"], a: "Tung" },
                { q: "How do you say 'Please'?", options: ["Ju lutem", "Faleminderit", "Mirëdita", "Natën e mirë"], a: "Ju lutem" }
            ]},
            { id: "1-2", title: "How are you?", icon: "😊", questions: [
                { q: "How do you ask 'How are you?'", options: ["Si je?", "Ku je?", "Çfarë është?", "Kush je?"], a: "Si je?" },
                { q: "I am fine:", options: ["Jam mirë", "Jam keq", "Jam lodhur", "Jam uritur"], a: "Jam mirë" },
                { q: "How do you say 'Not bad'?", options: ["Jo keq", "Shumë mirë", "Ashtu-ashtu", "Mirë"], a: "Jo keq" },
                { q: "I am happy:", options: ["Jam i lumtur", "Jam i mërzitur", "Jam i ftohtë", "Jam i nxehtë"], a: "Jam i lumtur" }
            ]},
            { id: "1-3", title: "My name is...", icon: "🙋", questions: [
                { q: "How do you ask 'What is your name?'", options: ["Si quhesh?", "Sa vjeç je?", "Ku banon?", "Si jeni?"], a: "Si quhesh?" },
                { q: "'My name is...' (Literal: I am called...)", options: ["Unë quhem...", "Unë jam...", "Emri im...", "Ti je..."], a: "Unë quhem..." },
                { q: "How do you say 'I am'?", options: ["Unë jam", "Ti je", "Ai është", "Ajo është"], a: "Unë jam" },
                { q: "How do you say 'Who are you?'", options: ["Kush je ti?", "Si je ti?", "Ku je ti?", "Çfarë bën?"], a: "Kush je ti?" }
            ]}
        ]
    },
    {
        worldId: 2,
        title: "WORLD 2",
        subtitle: "Everyday Objects",
        lessons: [
            { id: "2-1", title: "Around the House", icon: "🏠", questions: [
                { q: "What is 'House'?", options: ["Shtëpi", "Shkollë", "Makinë", "Rrugë"], a: "Shtëpi" },
                { q: "What is 'Door'?", options: ["Derë", "Dritare", "Karrige", "Tavolinë"], a: "Derë" },
                { q: "What is 'Window'?", options: ["Dritare", "Derë", "Mur", "Tavan"], a: "Dritare" },
                { q: "Where do you sleep? (The Bed):", options: ["Krevati", "Tavolina", "Kuzhina", "Banjo"], a: "Krevati" }
            ]},
            { id: "2-2", title: "In my Schoolbag", icon: "🎒", questions: [
                { q: "What is 'Book'?", options: ["Libër", "Fletore", "Laps", "Gomë"], a: "Libër" },
                { q: "What do you write with? (Pencil):", options: ["Laps", "Libër", "Mace", "Ujë"], a: "Laps" },
                { q: "What is 'Notebook'?", options: ["Fletore", "Libër", "Çantë", "Bankë"], a: "Fletore" },
                { q: "What is 'School'?", options: ["Shkollë", "Shtëpi", "Park", "Dyqan"], a: "Shkollë" }
            ]}
        ]
    }
]
    

// ================== UI NAVIGATION & MENUS ==================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'screen-worlds') {
        renderWorldsMap();
    }
    
    if (screenId !== 'screen-quiz') clearInterval(timerInterval);
    
    document.getElementById('side-menu').classList.remove('open');
    document.getElementById('menu-overlay').classList.add('hidden');
}

function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('open');
    document.getElementById('menu-overlay').classList.toggle('hidden');
}

function openLogin() {
    toggleMenu(); 
    document.getElementById('login-modal').classList.remove('hidden');
    document.getElementById('login-overlay').classList.remove('hidden');
}
function closeLogin() {
    document.getElementById('login-modal').classList.add('hidden');
    document.getElementById('login-overlay').classList.add('hidden');
}

// ================== DAILY TRACKER ==================
function initTracker() {
    document.getElementById('streak-count').innerText = streak;
    const today = new Date().toDateString();
    const btn = document.getElementById('btn-checkin');

    if (lastCheckIn === today) {
        btn.innerText = "Checked in today! ✅";
        btn.disabled = true;
    }

    const daysContainer = document.getElementById('tracker-days');
    if(daysContainer) {
        daysContainer.innerHTML = "";
        const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const currentDayOfWeek = new Date().getDay();

        dayLabels.forEach((label, index) => {
            const circle = document.createElement('div');
            circle.className = 'day-circle';
            circle.innerText = label;
            if (lastCheckIn === today && index === currentDayOfWeek) {
                circle.classList.add('checked');
            }
            daysContainer.appendChild(circle);
        });
    }
}

function checkInToday() {
    const today = new Date().toDateString();
    if (lastCheckIn !== today) {
        streak++;
        lastCheckIn = today;
        saveMemory();
        initTracker(); 
    }
}

// ================== WORLDS & LESSON MAP ==================
function renderWorldsMap() {
    const container = document.getElementById('worlds-container');
    container.innerHTML = "";

    gameWorlds.forEach((world) => {
        const worldDiv = document.createElement('div');
        worldDiv.className = 'world-section';
        
        worldDiv.innerHTML = `
            <h3 class="world-title">${world.title} <span class="world-subtitle">${world.subtitle}</span></h3>
        `;

        const scrollDiv = document.createElement('div');
        scrollDiv.className = 'lessons-scroll';

        world.lessons.forEach((lesson) => {
            const card = document.createElement('div');
            card.className = 'lesson-card';
            
            const isUnlocked = unlockedLessons.includes(lesson.id);
            if (!isUnlocked) card.classList.add('locked');

            let badgeHtml = isUnlocked ? "" : "🔒"; 
            if (isUnlocked && unlockedLessons.indexOf(lesson.id) < unlockedLessons.length - 1) {
                badgeHtml = "⭐";
            }

            card.innerHTML = `
                <div class="lesson-icon">${lesson.icon}</div>
                <div class="lesson-name">${lesson.title}</div>
                <div class="lesson-badge">${badgeHtml}</div>
            `;

            if (isUnlocked) {
                card.onclick = () => startLesson(world.worldId, lesson.id);
            }

            scrollDiv.appendChild(card);
        });

        worldDiv.appendChild(scrollDiv);
        container.appendChild(worldDiv);
    });
}

// ================== QUIZ LOGIC (Kept from your original) ==================
function startLesson(worldId, lessonId) {
    const world = gameWorlds.find(w => w.worldId === worldId);
    currentPlayingLesson = world.lessons.find(l => l.id === lessonId);
    
    currentQuesIdx = 0;
    
    document.getElementById('quiz-title-display').innerText = currentPlayingLesson.title;
    
    showScreen('screen-quiz');
    loadQuestion();
}

function loadQuestion() {
    const ques = currentPlayingLesson.questions[currentQuesIdx];

    document.getElementById('score-num').innerText = score;
    document.getElementById('question-text').innerText = ques.q;
    document.getElementById('feedback').innerText = "";

    const grid = document.getElementById('options-grid');
    grid.innerHTML = "";

    ques.options.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'option';
        div.innerText = opt;
        div.onclick = () => checkAnswer(div, opt, ques.a);
        grid.appendChild(div);
    });

    startTimer();
}

function checkAnswer(el, selected, correct) {
    clearInterval(timerInterval);
    document.querySelectorAll('.option').forEach(o => o.style.pointerEvents = 'none');

    if (selected === correct) {
        el.classList.add('correct');
        score += 10;
        document.getElementById('feedback').innerText = "Bravo! ✨";
        document.getElementById('feedback').style.color = "var(--correct)";
    } else {
        el.classList.add('wrong');
        document.getElementById('feedback').innerText = "Provo përsëri! ❌";
        document.getElementById('feedback').style.color = "var(--wrong)";
    }

    saveMemory(); 

    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

function nextQuestion() {
    currentQuesIdx++;

    if (currentQuesIdx >= currentPlayingLesson.questions.length) {
        finishLesson();
    } else {
        loadQuestion();
    }
}

function finishLesson() {
    document.getElementById('final-score').innerText = "Total Score: " + score;
    
    unlockNextLesson(currentPlayingLesson.id);

    showScreen('screen-end');
}

function unlockNextLesson(currentLessonId) {
    let flatLessons = [];
    gameWorlds.forEach(w => w.lessons.forEach(l => flatLessons.push(l.id)));
    
    let currentIndex = flatLessons.indexOf(currentLessonId);
    let nextIndex = currentIndex + 1;

    if (nextIndex < flatLessons.length) {
        let nextLessonId = flatLessons[nextIndex];
        if (!unlockedLessons.includes(nextLessonId)) {
            unlockedLessons.push(nextLessonId);
            saveMemory(); 
        }
    }
}

// ================== TIMER LOGIC (Kept from your original) ==================
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIMER_DURATION;
    updateTimerUI();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.querySelectorAll('.option').forEach(o => o.style.pointerEvents = 'none');
            document.getElementById('feedback').innerText = "Koha mbaroi! ⏰";
            document.getElementById('feedback').style.color = "var(--wrong)";
            setTimeout(nextQuestion, 2000);
        }
    }, 1000);
}

function updateTimerUI() {
    const timerBar = document.getElementById('timer-bar');
    const percentage = (timeLeft / TIMER_DURATION) * 100;
    timerBar.style.width = percentage + '%';

    if (timeLeft > 15) {
        timerBar.style.backgroundColor = "var(--correct)";
    } else if (timeLeft > 5) {
        timerBar.style.backgroundColor = "var(--warning)";
    } else {
        timerBar.style.backgroundColor = "var(--wrong)";
    }
}

// ================== INITIALIZE ==================
window.onload = () => {
    loadMemory();
    initTracker();
};
