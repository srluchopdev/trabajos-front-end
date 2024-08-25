// script.js
const cardsArray = [
    'A♠️', 'A♠️',
    'K♦️', 'K♦️',
    'Q♣️', 'Q♣️',
    'J♥️', 'J♥️',
    '10♠️', '10♠️',
    '9♦️', '9♦️',
    '8♣️', '8♣️',
    '7♥️', '7♥️'
];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let clickCount = 0;
let records = JSON.parse(localStorage.getItem('memoryGameRecords')) || [];

const gameBoard = document.getElementById('memory-game');
const clickCounter = document.getElementById('click-counter');
const recordList = document.getElementById('records');

function generateBoard() {
    clickCount = 0;
    clickCounter.textContent = `Clicks: ${clickCount}`;
    const shuffledCards = shuffle([...cardsArray]);

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = card;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');
        frontFace.textContent = card;

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        backFace.textContent = '?';

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        gameBoard.appendChild(cardElement);

        cardElement.addEventListener('click', flipCard);
    });

    updateRecords();
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    clickCount++;
    clickCounter.textContent = `Clicks: ${clickCount}`;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    checkForWin();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkForWin() {
    const flippedCards = document.querySelectorAll('.memory-card.flip');
    if (flippedCards.length === cardsArray.length) {
        setTimeout(() => {
            const playerName = prompt("¡Felicidades! Has ganado. Ingresa tu nombre:");
            saveRecord(playerName, clickCount);
            resetGame();
        }, 1000);
    }
}

function resetGame() {
    gameBoard.innerHTML = '';
    generateBoard();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function saveRecord(name, clicks) {
    records.push({ name, clicks });
    records.sort((a, b) => a.clicks - b.clicks);
    if (records.length > 5) {
        records.pop(); // Mantén solo los 5 mejores récords
    }
    localStorage.setItem('memoryGameRecords', JSON.stringify(records));
    updateRecords();
}

function updateRecords() {
    recordList.innerHTML = records.map(record => `<li>${record.name}: ${record.clicks} clicks</li>`).join('');
}

generateBoard();
