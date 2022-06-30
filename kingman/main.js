import './style.css'
import Hangman from './game.js'

const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
let game

window.addEventListener('keydown', (e) => {
  const guess = e.key
  game.makeGuess(guess)
  render()
})

const render = () => {
  puzzleEl.innerHTML = ''
  guessesEl.textContent = game.statusMessage

  game.puzzle.split('').forEach((letter) => {
    const letterEl = document.createElement('span')
    letterEl.textContent = letter
    puzzleEl.appendChild(letterEl)
  })
}



const getPuzzle = async (wordCount) => {
  const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
  if (response.status === 200) {
      const data = await response.json()
      return data.puzzle
  } else {
      throw new Error('unable to get puzzle')
  }
}

const startGame = async () => {
  const puzzle = await getPuzzle('1')
  img.setAttribute('src', 'img/hangman0.png');
  game = new Hangman(puzzle, 6)
  render()
  console.log(puzzle)
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()