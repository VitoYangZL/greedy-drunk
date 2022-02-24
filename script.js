'use strict';

const rule = document.getElementById('rule');
const reset = document.getElementById('reset');
const roll = document.getElementById('roll');
const enough = document.getElementById('enough');
const p1Label = document.getElementById('name--0');
const p2Label = document.getElementById('name--1');
const p1 = document.querySelector('.player--0');
const p2 = document.querySelector('.player--1');
const dice = document.getElementById('dice');
const p1Score = document.getElementById('score--0');
const p2Score = document.getElementById('score--1');
const p1Current = document.getElementById('current--0');
const p2Current = document.getElementById('current--1');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.closeModalBtn');

let state = true;
let onGame = true;
let currentNew = 0;
let diceNum = 5;
let p1ScoreContainer = 0;
let p2ScoreContainer = 0;

let imageName = 'dice-' + diceNum + '.png';

/*
p1.textContent = prompt(" Player1's name :");
if (p1.textContent == '') {
  p1.textContent = 'Player 1';
}
p2.textContent = prompt(" Player2's name :");
if (p2.textContent == '') {
  p2.textContent = 'Player 2';
}
*/

initialize();

//ui control
reset.addEventListener('click', initialize);
rule.addEventListener('click', () => {
  modal.classList.toggle('hidden');
});
closeModalBtn.addEventListener('click', () => {
  modal.classList.toggle('hidden');
});

//game logic

roll.addEventListener('click', () => {
  if (onGame == false) {
    return;
  }
  diceNum = rollDice();
  dice.attributes[0].value = 'dice-' + diceNum + '.png';
  if (state == true) {
    if (diceNum == 1) {
      p1Current.textContent = 0;
      currentNew = 0;
      state = false;
      p1.classList.remove('player--active');
      p2.classList.add('player--active');
      console.log('P2 turn');
    } else {
      console.log('P1 roll ' + diceNum);
      currentNew += diceNum;
      p1Current.textContent = currentNew;
    }
  } else {
    if (diceNum != 1) {
      console.log('P2 roll ' + diceNum);
      currentNew += diceNum;
      p2Current.textContent = currentNew;
    } else {
      p2Current.textContent = 0;
      currentNew = 0;
      state = true;
      p2.classList.remove('player--active');
      p1.classList.add('player--active');
      console.log('P1 turn');
    }
  }
});

enough.addEventListener('click', () => {
  if (onGame == false) {
    return;
  }
  if (state == true) {
    if (Number(p1Current.textContent) == 0) {
      return;
    }
    p1ScoreContainer += Number(p1Current.textContent);
    p1Score.textContent = p1ScoreContainer;

    p1Current.textContent = 0;
    currentNew = 0;
    state = false;
    p1.classList.remove('player--active');
    p2.classList.add('player--active');
    console.log('P2 turn');
  } else {
    if (onGame == false) {
      return;
    }
    if (Number(p2Current.textContent) == 0) {
      return;
    }
    p2ScoreContainer += Number(p2Current.textContent);
    p2Score.textContent = p2ScoreContainer;

    p2Current.textContent = 0;
    currentNew = 0;
    state = true;
    p2.classList.remove('player--active');
    p1.classList.add('player--active');
    console.log('P1 turn');
  }
  if (p1ScoreContainer >= 100) {
    onGame = false;
    p1.classList.add('player--winner');
    p1Label.classList.add('name');
  } else if (p2ScoreContainer >= 100) {
    onGame = false;
    p2.classList.add('player--winner');
    p2Label.classList.add('name');
  }
});

//function
function initialize() {
  p1Score.textContent = '0';
  p2Score.textContent = '0';
  p1Current.textContent = '0';
  p2Current.textContent = '0';
  p1ScoreContainer = 0;
  p2ScoreContainer = 0;
  dice.attributes[0].value = imageName;
  console.log('Game Reset !');
  state = true;
  onGame = true;
  p1.classList.remove('player--winner');
  p1Label.classList.remove('name');
  p2.classList.remove('player--winner');
  p2Label.classList.remove('name');
  if (p2.classList.contains('player--active')) {
    p2.classList.toggle('player--active');
    p1.classList.add('player--active');
  }
}

function rollDice() {
  if (onGame == false) {
    return;
  }
  let randomNum = Math.floor(Math.random() * 6) + 1;
  return randomNum;
}
