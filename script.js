//Word List
const wordList = [
    'gold',
    'baby',
    'crib',
    'love',
    'hope',
    'kind',
    'jump',
    'play',
    'tree',
    'star',
    'blue',
    'moon',
    'rain',
    'clover',
    'dream',
    'light',
    'apple',
    'brave',
    'happy',
    'sunset',
    'ticket',
    'garden',
    'smooth',
    'laughter',
    'theater',
    'lanturn',
    'fiction',
    'journey',
    'mystery',
    'charm',
    'parade',
    'leprechaun',
    'treasure',
    'celebration',
    'greenery',
    'shenanigans',
    'scenical',
    'painting',
    'violinist',
    'costumes',
    'evenings',
    'pumpkins',
    'modeling',
    'furniture',
    'mustangs',
    'violinist',
    'shenanigans',
    'tradition'
]

//declare variables
let = selectedWord =''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
let wins = 0;
let losses = 0;
const maxMistakes = 6


//Start Game Function (runs everything)
function startGame(level){
    //reset game
    wrongGuesses = 0
    guessedLetters = []
    
    selectedWord = getRandomWord(level) 
    displayedWord = '_'.repeat(selectedWord.length)

    updateDifficultyDisplay(level)
    updateUI()

    //Show Game Area/difficulty Display , hide selection buttons
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-block')

    document.getElementById('restartBtn').classList.remove('d-none');

    document.getElementById('hideLater').classList.remove('d-none');

    document.getElementById('shamrock').classList.remove('d-none');
    
    document.getElementById('wrongLetters').classList.remove('d-none');

    document.getElementById('difficultySelection').classList.add('d-none')
    document.getElementById('letterInput').focus()


}

function updateScoreTracker() {
    const scoreTracker = document.getElementById('scoreTracker');
    scoreTracker.textContent = `Wins: ${wins} | Losses: ${losses}`;}



function getRandomWord(level) {
    let filteredWords = wordList.filter ( word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })
    return filteredWords[Math.floor(Math.random()*filteredWords.length)]
}


//Update Difficulty Display
function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy','medium','hard')

    if(level === 'easy') {
        difficultyBox.classList.add('easy')
        difficultyBox.innerText = 'Difficulty: Easy 🥱'
        document.getElementById('og-stick-man').classList.add('d-none')
        document.getElementById('shamrock').classList.remove('d-none')
        document.getElementById('adjust').classList.add('adjust')
    } else if(level === 'medium') {
        difficultyBox.classList.add('medium')
        difficultyBox.innerText = 'Difficulty: Medium 😐'
        document.getElementById('og-stick-man').classList.add('d-none')
        document.getElementById('shamrock').classList.remove('d-none')
        document.getElementById('adjust').classList.add('adjust')
    } else if(level === 'hard') {
        difficultyBox.classList.add('hard')
        difficultyBox.innerText = 'Difficulty: Hard 🫠'
        document.getElementById('og-stick-man').classList.add('d-none')
        document.getElementById('shamrock').classList.remove('d-none')
        document.getElementById('adjust').classList.add('adjust')
    }
}

function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ') //show word
}

function guessedLetter() {
    let inputField = document.getElementById('letterInput') //Get input field
    let guessedLetter = inputField.value.toLowerCase() // Convert input to lowercase

        //Check if input is a valid letter (A-Z)
    if (!guessedLetter.match(/^[a-z]$/)){
        alert('Please enter a Valid Letter (A-Z)!') //Alert user if invalid input
        inputField.value= '' //Clear input field
        return //Exit function
    }


    //Check if Letter was already guessed
    if(guessedLetters.includes(guessedLetter)) {
        alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
        inputField.value = '' //Clear input Value
        return
    }


    //Store guessed Letter
    guessedLetters.push(guessedLetter)


    //Check if guessed letter is in the word
    if (selectedWord.includes(guessedLetter)) {
        updateCorrectGuess(guessedLetter)
        document.getElementById("soundEffect").play();
    } else {
        updateWrongGuess(guessedLetter)
        document.getElementById("soundEffect2").play();
    }

    inputField.value = '' // clear input field
    document.getElementById('letterInput').focus() // Refocus input field for next guess
}

function updateWrongGuess(guessedLetter){
    wrongGuesses++
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`  
    document.getElementById('shamrock').src= `imgs/shamrock${6-wrongGuesses}.png`

    if (wrongGuesses === maxMistakes){
        endGame(false)
      }
}

function updateCorrectGuess(guessedLetter){
    let newDisplayedWord =''

    for (let i=0; i < selectedWord.length; i++){
        if (selectedWord[i] === guessedLetter){
            newDisplayedWord += guessedLetter
        } else {
            newDisplayedWord += displayedWord[i]
        }
    }

    displayedWord = newDisplayedWord
    updateUI()  

    //Check if the Player has guessed all letters
    if (!displayedWord.includes('_')) {
        endGame(true)
    }
}

function endGame(won){
    let message = won
    if (won) {
        wins++ // Add 1 to win count
        messageBox = document.getElementById('messageBox');
        message = '🎉 Congratulations! You guessed the word! 🍀';
        messageBox.classList.remove('d-none');
        messageBox.innerText = message;
    } else {
        losses++; // Add 1 to loss count
        message = `❌ Game Over! The word was "${selectedWord}".`;
        document.getElementById('messageBox2').classList.remove('d-none')

        messageBox2 = document.getElementById('messageBox2');
        message2 = `❌ Game Over! The word was "${selectedWord}".`;
        messageBox2.classList.remove('d-none');
        messageBox2.innerText = message2;
    }
   updateScoreTracker();

   document.getElementById('letterInput').disabled = true; // Disables letter input after game over
  setTimeout(() => message(message), 100) // Display alert after short delay
  }

  //Enter Key Functionality
  document.getElementById('letterInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        guessedLetter();
    }
});

updateScoreTracker();

function restartGame() {
    // Reset game variables
    wrongGuesses = 0;
    guessedLetters = [];

    // Hide boxes
    //Messages
    document.getElementById('messageBox').classList.add('d-none');
    document.getElementById('messageBox2').classList.add('d-none');
    //Shamrock
    document.getElementById('shamrock').classList.add('d-none');
    //Guess Box
    document.getElementById('hideLater').classList.add('d-none');
    //Restart Button
    document.getElementById('restartBtn').classList.add('d-none');
    //Select Difficulty Box
    document.getElementById('difficultyBox').classList.add('d-none');
    
    document.getElementById('wrongLetters').classList.add('d-none');


    // Reset UI elements
    document.getElementById('wrongLetters').textContent = 'Wrong Guesses:';
    document.getElementById('shamrock').src = 'imgs/shamrock6.png';
    document.getElementById('wordDisplay').textContent = '';
    document.getElementById('og-stick-man').classList.remove('d-none')

    // Show difficulty selection again
    document.getElementById('difficultySelection').classList.remove('d-none');
    // Allows letter input to be typed again game over
    document.getElementById('letterInput').disabled = false; 
}
