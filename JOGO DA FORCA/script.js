const words = ["javascript", "html", "css", "frontend", "backend"];
let chosenWord;
let displayedWord;
let remainingAttempts;
let guessedLetters;

document.getElementById('guess-button').addEventListener('click', makeGuess);
document.getElementById('reset-button').addEventListener('click', resetGame);

function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(chosenWord.length).fill('_');
    remainingAttempts = 6;
    guessedLetters = [];

    updateDisplay();
}

function makeGuess() {
    const letterInput = document.getElementById('letter-input');
    const letter = letterInput.value.toLowerCase();

    if (letter.length !== 1 || !/[a-z]/.test(letter)) {
        document.getElementById('message').textContent = 'Digite uma letra válida!';
        return;
    }

    if (guessedLetters.includes(letter)) {
        document.getElementById('message').textContent = 'Você já chutou essa letra!';
        return;
    }

    guessedLetters.push(letter);

    if (chosenWord.includes(letter)) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                displayedWord[i] = letter;
            }
        }
    } else {
        remainingAttempts--;
    }

    updateDisplay();

    if (!displayedWord.includes('_')) {
        document.getElementById('message').textContent = 'Parabéns, você ganhou!';
        document.getElementById('guess-button').disabled = true;
    } else if (remainingAttempts <= 0) {
        document.getElementById('message').textContent = `Você perdeu! A palavra era: ${chosenWord}`;
        document.getElementById('guess-button').disabled = true;
    }

    letterInput.value = '';
}

function updateDisplay() {
    document.getElementById('word-display').textContent = displayedWord.join(' ');
    document.getElementById('remaining-attempts').textContent = remainingAttempts;
    document.getElementById('message').textContent = '';
}

function resetGame() {
    startGame();
    document.getElementById('guess-button').disabled = false;
}

// Inicia o jogo ao carregar a página
window.onload = startGame;


