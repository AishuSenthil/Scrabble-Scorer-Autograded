// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  console.log("Let's play some Scrabble!");
 let word = input.question("Enter a word: ") //Asking input and storing it in the variable "word"
  // console.log(oldScrabbleScorer(word)); // Calling the fucntion oldScrabblescorer and "word" in the argument
  return word
}
  
   

function simpleScorer (word){
   return word.length
 }
 
//  console.log(simpleScorer(initialPrompt())); //**check**// 
 //Am calling simpleScorer function by passing initialPrompt function as argument

function vowelBonusScorer (word){
  const vowels = ["A","E","I","O","U"]; //Set a constant variable "vowels" to hold the vowels
  word = word.toUpperCase(); //Converting all the letters to uppercase
  let score = 0 ; //setting score to 0
  
for (let i = 0; i < word.length; i++) {  //Creating a loop where vowels get 3 points and non vowel gets 1 point
  if (vowels.includes(word[i])) {
    score += 3;
  } if(!vowels.includes(word[i])) {
    score += 1;
  }
}
return score;
}
// console.log(vowelBonusScorer(initialPrompt())); // **check**//



function scrabbleScorer(word) {
  word = word.toLowerCase();

   let score = 0

   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]];
      
   }
   return score;
}

const scoringAlgorithms = [{
      
   name: 'Simple Score',
   description: 'Each letter worth one point.',
   scorerFunction: simpleScorer
   },

   {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.', //These are the scoring algorithm where later the user is 
   scorerFunction: vowelBonusScorer                       //Asked to choose with what type of algorithm they like to play
   },

   {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
   }];

function scorerPrompt(word) {  // input from the scorerPrompt will be passed to scoring algorithm
  let scorePrompt = input.question(          //Calling scoringAlgorithm function in the ScorerPrompt
      `   
      Which scoring algorithm would you like to use?

      0 - Simple: One point per character
      1 - Vowel Bonus: Vowels are worth 3 points
      2 - Scrabble: Uses scrabble point system
      Enter 0, 1, or 2: `
   );

   word = word.toUpperCase();

   if (scorePrompt === '0') {
      console.log(`Algorithm name: ${scoringAlgorithms[0].name}\nScore for the word '${word}': ${scoringAlgorithms[0].scorerFunction(word)}`);
      
   } else if (scorePrompt === '1') {
     console.log(`Algorithm name: ${scoringAlgorithms[1].name}\nScore for the word '${word}': ${scoringAlgorithms[1].scorerFunction(word)}`);
   
   } else if (scorePrompt === '2') {
      console.log(`Algorithm name: ${scoringAlgorithms[2].name}\nScore for the word '${word}': ${scoringAlgorithms[2].scorerFunction(word)}`);
      
   } else {
      console.log("Not a valid number, try again.");
   }
   
}


function transform (oldPointStructure){
//The olpPointStructure must iterate through each key and check if it contains the letter in the word
let newPointStructure = {};  //Here we are converting the old format to new where each alphabet is a key
for (let points in oldPointStructure) {
   let score = Number(points); //Converting points(key in oldpointStructure) to number and assigned to a variable "score"

   for (let letter of oldPointStructure[points]) {
      newPointStructure[letter.toLowerCase()] = score;
   }
}
return newPointStructure;
}
let newPointStructure = transform(oldPointStructure); //Setting the transform function equal to the newpointStructure object
// console.log("Scrabble scoring values for");
// console.log("letter A:", newPointStructure['A']);  //**Check* */
// console.log("letter J:", newPointStructure['J']);
// console.log("letter Z:", newPointStructure['Z']);

function runProgram() {
  let userWord = initialPrompt();
  scorerPrompt(userWord);
  
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
