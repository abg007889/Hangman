const {readFileSync, promises: fsPromises} = require('fs');

// ✅ read file SYNCHRONOUSLY
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let wordlist = syncReadFile('./example.txt');
let randNum = Math.floor(Math.random()*wordlist.length)

let hp = 20;
const word = wordlist[randNum].toLowerCase();
const wordLength = word.length;

// console.log(word);

// make underline string
// starts as array, later join as string
let underline = [];
for (let i = 0; i < word.length; i++) {
  underline.push('_');
}

// main game loop
while (hp > 0) {
  // get input
  let input = prompt(underline.join("")).toLowerCase();
  // check if input is single letter
  if (input.length !== 1) {
    hp--;
    console.log("invalid length");
    continue;
  }
  // if input is single letter, check with word
  else {
    for (let i = 0; i < word.length; i++) {
      // for each word letter
      if (input === word[i]) {
        // update underline string 
        underline[i] = word[i];
      }
    }
    // check win or not
    // if win, break while loop
    if (underline.join("") == word) {
      console.log(underline.join(""));
      console.log("Win");
      break;
    }
    hp--;
    console.log(hp);
  }
}
if (hp <= 0) console.log("You lose, the word is "+word);

// declare hp to 100
// get random word
// get the length of the word
// declare empty string "underline", loop a underline for N times with the length of the word
// prompt question => _____ , make a guess
// read input
// for each letter in word, check if input matches
//    -> make new underscore string??
// if the full word is guessed correctly, win
// reduce hp
// re-loop