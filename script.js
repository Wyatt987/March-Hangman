//Word List
const wordList = [
    'gold',
    'luck',
    'clover',
    'rain',
    'charm',
    'parade',
    'leprechaun',
    'treasure',
    'celebration',
    'greenery',
    'shenanigans',
    'tradition'
]

//declare variables
let = selectedWord =''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
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

    document.getElementById('difficultySelection').classList.add('d-none')
    document.getElementById('letterInput').focus()


}



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

    } else if(level === 'medium') {
        difficultyBox.classList.add('medium')
        difficultyBox.innerText = 'Difficulty: Medium 😐'

    } else if(level === 'hard') {
        difficultyBox.classList.add('hard')
        difficultyBox.innerText = 'Difficulty: Hard 🫠'
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
    } else {
        updateWrongGuess(guessedLetter)
    }

    inputField.value = '' // clear input field
    document.getElementById('letterInput').focus() // Refocus input field for next guess
}

function updateWrongGuess(guessedLetter){
    wrongGuesses++
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`  
    //document.getElementById('shamrock').src= `imgs/shamrock${6-wrongGuesses}.jpg`

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
        message = '🎉 Congratulations! You guessed the word! 🍀';
       // .document.getElementById('messageBox').addEventListener     finish this
    } else {
        message = `❌ Game Over! The word was "${selectedWord}".`;
    }
  
  setTimeout(() => alert(message), 100) // Display alert after short delay
  }

  //Enter Key Functionality
  document.getElementById('letterInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        guessedLetter();
    }
});