import {wordList} from "./wordlist.js";
    
// constants and variables
let answer;
let rand;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let winCount = 0;
let chances = 10;
let correctLetters = [];
let wrongLetters = [];
let underline = [];

// initialize answer
do{
  rand = Math.floor(Math.random() * wordList.length);
  answer = wordList[rand].toLowerCase();
}while(answer.length !== 5 || !isValidWord(answer, false))
console.log(answer);

// initialize the underline string
for (let i = 0; i < answer.length; i++) {
  underline.push('_');
}
document.getElementById("guessed").innerHTML = underline.join(" ");

// set event listeners
document.getElementById("user-input").addEventListener("keydown", pressKey);
document.getElementById("enter").addEventListener("click", pressKey);
document.getElementById("backspace").addEventListener("click", pressKey);
for (const key of alphabet) {
  // for each keyboard letter buttons
  document.getElementById(key).addEventListener("click", pressKey);
}

// focus the input field at start
document.getElementById("user-input").focus();

// helper functions
function isValidWord(str, toAlert=true) {
  // check if a string contains only letters
  for (const letter of str) {
    if (!alphabet.includes(letter)) {
      if (toAlert) {
        alert("Please enter only letters!");
      }
      return false;
    }
  }
  return true;
}

function hasWrongLetter(str) {
  // check if a string contains known wrong letters
  for (const letter of str) {
    if (wrongLetters.includes(letter)) {
      alert("You used wrong letters, guess again!");
      return true;
    }
  }
  return false;
}

function matchGuessed(str) {
  // check if the string contains known letters at right positions
  for (let i = 0; i < str.length; i++) {
    if (underline[i] !== "_" && str[i] !== underline[i]) {
      alert(`Please follow the guessed letters: ${underline.join("")}`);
      return false;
    }
  }
  return true;
}


// main game logic
function game(event) {
  // get input string
  let input = document.getElementById("user-input").value.toLowerCase();

  // give warning and do nothing under three invalid cases
  if (!isValidWord(input) || hasWrongLetter(input) || !matchGuessed(input)) {
    return;
  }

  // when input is valid, clear input field for convenience
  document.getElementById("user-input").value = "";

  // compare input with the answer, letter by letter
  for (let i = 0; i < answer.length; i++) {

    // if input letter is not in anwser, put in wrongLetters array
    if (!answer.includes(input[i])) {
      if (!wrongLetters.includes(input[i])) {
        wrongLetters.push(input[i]);
      }
      continue; // end current iteration, no need to check letter position
    }

    // if answer contains input letter, put in correctLetters array
    else {
      if (!correctLetters.includes(input[i])) {
        correctLetters.push(input[i]);
      }
      // if input letter is at correct position, update underline string
      if (input[i] === answer[i]) {
        underline[i] = answer[i];
      }
    }
  }

  // if input does not equal to answer, reduce hp
  if (input !== answer) {
    chances--;
  }

  // update display text for underline word, the correct and wrong characters, and hp bar
  document.getElementById("guessed").innerHTML = underline.join(" ");
  document.getElementById("wrong").innerHTML = wrongLetters.join(" ");
  document.getElementById("correct").innerHTML = correctLetters.join(" ");
  document.getElementById("hp").style.width = `${chances / 10 * 100}%`;
  document.getElementById("chances").innerText = ' ' + chances;
  // check win and restart
  if (input == answer) {
    alert(`You won, answer is ${answer}`);
    winCount++;
    restart();
  }

  // if chance runs out, player loses and game restarts
  if (chances === 0) {
    alert(`You lost, answer is ${answer}`);
    restart();
  }
}


// start a new game
function restart() {
  chances = 10;
  document.getElementById("hp").style.width = "100%";
  wrongLetters = [];
  document.getElementById("wrong").innerHTML = wrongLetters.join(" ");
  correctLetters = [];
  document.getElementById("correct").innerHTML = correctLetters.join(" ");
  underline = [];
  for (let i = 0; i < answer.length; i++) {
    underline.push('_');
  }
  document.getElementById("guessed").innerHTML = underline.join(" ");
  document.getElementById("user-input").focus();
  document.getElementById("chances").innerText = ' ' + chances;
  document.getElementById("win").innerText = ' ' + winCount;
}


// keydown/click event handler
function pressKey(event) {
  let input = document.getElementById("user-input").value;

  // run game logic for typing "enter" or clicking virtual "enter" button
  if (event.key === "Enter" || event.target.getAttribute("id") === "enter") {
    if (input.length < 5) {
      // do nothing if input is fewer than 5 letter long
      alert("please type a 5-letter word");
      return;
    }
    game();
  }

  // type letter using virtual keyboard
  if (alphabet.includes(event.target.getAttribute("id")) && input.length < 5) {
    document.getElementById("user-input").value += event.target.getAttribute("id");
    document.getElementById("user-input").focus();
  }

  // delete letter using virtual keyboard
  if (event.target.getAttribute("id") === "backspace") {
    document.getElementById("user-input").value = input.slice(0, -1);
    document.getElementById("user-input").focus();
  }
}