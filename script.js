// Show Rock Paper Scissors Game
function showRPSGame() {
    document.getElementById("rps-game").style.display = "block";
}

// Rock, Paper, Scissors Logic
function playRPS(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";
    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "You win!";
    } else {
        result = "You lose!";
    }

    document.getElementById("rps-result").innerText = `Computer chose ${computerChoice}. ${result}`;
}

let quizAnswers = {};

function selectAnswer(question, answer) {
    quizAnswers[question] = answer;

    // Highlight the selected answer
    let options = document.querySelectorAll(`.quiz-option`);
    options.forEach(option => {
        if (option.getAttribute("onclick").includes(question)) {
            option.style.background = "white";
            option.style.color = "#6a5acd";
        }
    });

    let selectedOption = document.querySelector(`.quiz-option[onclick="selectAnswer('${question}', '${answer}')"]`);
    selectedOption.style.background = "#5b4bb7";
    selectedOption.style.color = "white";
}

function calculatePhilosopher() {
    let scores = { kant: 0, aristotle: 0, nietzsche: 0, hume: 0, descartes: 0 };

    for (let key in quizAnswers) {
        scores[quizAnswers[key]] += 1;
    }

    let maxScore = Math.max(...Object.values(scores));
    let result = Object.keys(scores).filter(key => scores[key] === maxScore);

    let philosopher = result.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(", ");
    document.getElementById("quiz-result").innerText = "Your philosophical match is: " + philosopher;
}
function showQuiz() {
    document.getElementById("moral-quiz").style.display = "block";
}
function showAnimeQuiz() {
    document.getElementById("anime-quiz").style.display = "block";
}

let animeQuizAnswers = {};

function selectAnimeAnswer(question, answer) {
    animeQuizAnswers[question] = answer;

    // Reset styling for all options in the same question
    let options = document.querySelectorAll(`.quiz-option.anime`);
    options.forEach(option => {
        if (option.getAttribute("onclick").includes(question)) {
            option.style.background = "white";
            option.style.color = "#ff4500";
        }
    });

    // Highlight selected answer
    let selectedOption = document.querySelector(`.quiz-option.anime[onclick="selectAnimeAnswer('${question}', '${answer}')"]`);
    selectedOption.style.background = "#ff4500";
    selectedOption.style.color = "white";
}

function calculateAnimeProtagonist() {
    let scores = { luffy: 0, goku: 0, naruto: 0, ryo: 0, eren: 0 };

    for (let key in animeQuizAnswers) {
        scores[animeQuizAnswers[key]] += 1;
    }

    let maxScore = Math.max(...Object.values(scores));
    let result = Object.keys(scores).filter(key => scores[key] === maxScore);

    let protagonist = result.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(", ");
    document.getElementById("anime-quiz-result").innerText = "Your anime protagonist match is: " + protagonist;
}

// Calendar with Persistent Notes
const monthYearElement = document.getElementById("calendar-month-year");
const daysContainer = document.getElementById("calendar-days");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");
const selectedDateElement = document.getElementById("selected-date");

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let currentDate = new Date();
let selectedDate = null;

// Render Calendar
function renderCalendar() {
    daysContainer.innerHTML = "";
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    monthYearElement.textContent = `${months[month]} ${year}`;

    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();

    // Add empty spaces for alignment
    for (let i = 0; i < firstDay; i++) {
        let emptyCell = document.createElement("span");
        daysContainer.appendChild(emptyCell);
    }

    // Add calendar days
    for (let i = 1; i <= lastDate; i++) {
        let dayCell = document.createElement("span");
        dayCell.textContent = i;
        dayCell.onclick = () => selectDate(i, month, year);

        if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayCell.classList.add("current-day");
        }

        daysContainer.appendChild(dayCell);
    }
}

// Select a Date and Load Notes
function selectDate(day, month, year) {
    selectedDate = `${year}-${month + 1}-${day}`;
    selectedDateElement.textContent = `${months[month]} ${day}, ${year}`;
    loadNotes();
}

// Save Note
function saveNote() {
    if (!selectedDate) {
        alert("Please select a date first!");
        return;
    }

    let noteText = noteInput.value.trim();
    if (!noteText) {
        alert("Note cannot be empty!");
        return;
    }

    let savedNotes = JSON.parse(localStorage.getItem("calendarNotes")) || {};
    
    // Store multiple notes per day
    if (!savedNotes[selectedDate]) {
        savedNotes[selectedDate] = [];
    }

    savedNotes[selectedDate].push(noteText);
    localStorage.setItem("calendarNotes", JSON.stringify(savedNotes));

    noteInput.value = "";
    loadNotes();
}

// Load Notes from Local Storage
function loadNotes() {
    notesList.innerHTML = "";
    let savedNotes = JSON.parse(localStorage.getItem("calendarNotes")) || {};
    let notesForDay = savedNotes[selectedDate] || [];

    notesForDay.forEach((note, index) => {
        let noteItem = document.createElement("li");
        noteItem.innerHTML = `${note} <button class="delete-note" onclick="deleteNote(${index})">Delete</button>`;
        notesList.appendChild(noteItem);
    });
}

// Delete a Note
function deleteNote(index) {
    let savedNotes = JSON.parse(localStorage.getItem("calendarNotes")) || [];
    savedNotes[selectedDate].splice(index, 1);
    localStorage.setItem("calendarNotes", JSON.stringify(savedNotes));
    loadNotes();
}

// Load notes when the page is opened
window.onload = function () {
    renderCalendar();
    if (selectedDate) {
        loadNotes();
    }
};

// Change month event listeners
prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});


