'use strict';
let firstPlayerScore = 0;
let secondPlayerScore = 0;
let firstPlayerCurrScore = 0;
let secondPlayerCurrScore = 0;
let player1_chance = true;
let player2_chance = false;
const rollDiceButton = document.querySelector('.rollDice');
const holdUpButtoon = document.querySelector('.holdUp');
const newGameButton = document.querySelector('.newGame');
const diceImg = document.querySelector('.diceImg');
const totalScore = document.querySelectorAll('.totalScore');
const currScore = document.querySelectorAll('.currScore');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const winner = document.querySelectorAll('.winner');

function switchPlayer() {
  player1_chance = !player1_chance;
  player2_chance = !player2_chance;
  if (left.classList.contains('activePlayer')) {
    left.classList.remove('activePlayer');
    right.classList.add('activePlayer');
  } else {
    right.classList.remove('activePlayer');
    left.classList.add('activePlayer');
  }
}
function checkWinner() {
  if (firstPlayerScore >= 100) {
    left.classList.add('winnerBag');
    winner[0].textContent = 'Congratulations 🏆 You won the Game!!';
  } else if (secondPlayerScore >= 100) {
    right.classList.add('winnerBag');
    winner[1].textContent = 'Congratulations 🏆 You won the Game!!';
  }
}
function addtoTotalScore() {
  if (player1_chance) {
    firstPlayerScore += firstPlayerCurrScore;
    totalScore[0].textContent = firstPlayerScore;
    firstPlayerCurrScore = 0;
    currScore[0].textContent = firstPlayerCurrScore;
  } else if (player2_chance) {
    secondPlayerScore += secondPlayerCurrScore;
    totalScore[1].textContent = secondPlayerScore;
    secondPlayerCurrScore = 0;
    currScore[1].textContent = secondPlayerCurrScore;
  }
}
function AddtoCurrScore(diceNum) {
  if (player1_chance) {
    if (diceNum != 1) firstPlayerCurrScore += diceNum;
    else {
      firstPlayerCurrScore = 0;
      switchPlayer();
    }
    currScore[0].textContent = firstPlayerCurrScore;
  } else if (player2_chance) {
    if (diceNum != 1) secondPlayerCurrScore += diceNum;
    else {
      secondPlayerCurrScore = 0;
      switchPlayer();
    }
    currScore[1].textContent = secondPlayerCurrScore;
  }
}

rollDiceButton.addEventListener('click', function () {
  const diceNum = Math.trunc(Math.random() * 6 + 1);
  diceImg.setAttribute('src', `./images/dice-${diceNum}.png`);
  AddtoCurrScore(diceNum);
});

holdUpButtoon.addEventListener('click', function () {
  addtoTotalScore();
  checkWinner();
  switchPlayer();
});

newGameButton.addEventListener('click', function () {
  firstPlayerScore = 0;
  secondPlayerScore = 0;
  firstPlayerCurrScore = 0;
  secondPlayerCurrScore = 0;
  player1_chance = true;
  player2_chance = false;
  // left.style.backgroundColor = '#ba7896';
  // right.style.backgroundColor = '#ba7896';
  if (left.classList.contains('winnerBag')) {
    left.classList.remove('winnerBag');
    left.classList.add('activePlayer');
    right.classList.remove('activePlayer');
  } else if (right.classList.contains('winnerBag')) {
    right.classList.remove('winnerBag');
    right.classList.remove('activePlayer');
  }
  diceImg.setAttribute('src', `./images/dice-6.png`);
  for (let i = 0; i <= 1; i++) {
    totalScore[i].textContent = 0;
    currScore[i].textContent = 0;
    winner[i].textContent = '';
  }
});

function displayInstructions() {
  document.querySelector('.modal-window').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
}
function closeModal() {
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.modal-window').classList.add('hidden');
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
