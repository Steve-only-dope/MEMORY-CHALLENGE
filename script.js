const objects = [
    "Avion", "Balle", "Chaise", "Drapeau", "Échelle", "Fleur", "Guitare", "Horloge", "Igloo", "Jardin",
    "Kilo", "Livre", "Montre", "Nuage", "Orange", "Piano", "Quille", "Roue", "Soleil", "Table",
    "Univers", "Vent", "Wagon", "Xylophone", "Yacht", "Zèbre", "Abricot", "Banane", "Cactus", "Dent",
    "Éléphant", "Feuille", "Glace", "Hérisson", "Ivoire", "Jupe", "Ketchup", "Lampe", "Miroir", "Neige",
    "Olive", "Parapluie", "Quenouille", "Raisin", "Savon", "Télévision", "Ustensile", "Violette", "Whisky",
    "Xérès", "Yaourt", "Zigzag"
];

let selectedObjects = [];
let selectedLetters = [];
let score = 0;
let countdown;

const objectsGrid = document.getElementById('objectsGrid');
const phase1 = document.getElementById('phase1');
const phase2 = document.getElementById('phase2');
const lettersElement = document.getElementById('letters');
const userInput1 = document.getElementById('userInput1');
const userInput2 = document.getElementById('userInput2');
const userInput3 = document.getElementById('userInput3');
const submitBtn = document.getElementById('submitBtn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');

function selectObjects() {
    selectedObjects = [];
    while (selectedObjects.length < 10) {
        const randomObject = objects[Math.floor(Math.random() * objects.length)];
        if (!selectedObjects.includes(randomObject)) {
            selectedObjects.push(randomObject);
        }
    }
}

function startTimer(duration) {
    let timeRemaining = duration;
    updateTimerDisplay(timeRemaining);
    countdown = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay(timeRemaining);
        if (timeRemaining <= 0) {
            clearInterval(countdown);
            phase1.style.display = 'none';
            phase2.style.display = 'block';
            startPhase2();
        }
    }, 1000);
}

function updateTimerDisplay(timeRemaining) {
    timerElement.textContent = `Temps restant : ${timeRemaining} secondes ⏱️`;
    if (timeRemaining > 10) {
        timerElement.style.color = 'green';
    } else if (timeRemaining > 5) {
        timerElement.style.color = 'orange';
    } else {
        timerElement.style.color = 'red';
    }
}

function displayObjects() {
    objectsGrid.innerHTML = '';
    selectedObjects.forEach(object => {
        const div = document.createElement('div');
        div.className = 'object';
        div.textContent = object;
        objectsGrid.appendChild(div);
    });

    startTimer(20);
}

function selectLetters() {
    selectedLetters = [];
    while (selectedLetters.length < 3) {
        const randomLetter = selectedObjects[Math.floor(Math.random() * selectedObjects.length)][0];
        if (!selectedLetters.includes(randomLetter)) {
            selectedLetters.push(randomLetter);
        }
    }
}

function startPhase2() {
    selectLetters();
    lettersElement.textContent = selectedLetters.join(', ');
    userInput1.value = '';
    userInput2.value = '';
    userInput3.value = '';
}

function checkAnswers() {
    const answers = [
        userInput1.value.trim(),
        userInput2.value.trim(),
        userInput3.value.trim()
    ];

    let correctCount = 0;
    selectedLetters.forEach((letter, index) => {
        const correctAnswer = selectedObjects.find(obj => obj.startsWith(letter));
        if (answers[index].toLowerCase() === correctAnswer?.toLowerCase()) {
            correctCount++;
        }
    });

    feedbackElement.textContent = `Vous avez ${correctCount} bonne(s) réponse(s) sur 3.`;
    feedbackElement.style.color = correctCount === 3 ? 'green' : 'red';
    score += correctCount * 10;
    scoreElement.textContent = `Score : ${score} 🏆`;

    // Afficher le bouton pour relancer une manche
    restartBtn.style.display = 'block';
}

function restartGame() {
    restartBtn.style.display = 'none';
    feedbackElement.textContent = '';
    phase2.style.display = 'none';
    phase1.style.display = 'block';
    selectObjects();
    displayObjects();
}

// Initialisation
selectObjects();
displayObjects();

// Événements
submitBtn.addEventListener('click', checkAnswers);
restartBtn.addEventListener('click', restartGame);