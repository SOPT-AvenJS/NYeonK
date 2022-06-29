import './style.css'

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
  console.log(puzzle)
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()