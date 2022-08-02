class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('')
    this.remainingGuesses = remainingGuesses
    this.guessedLetters = []
    this.status = 'playing'
    this.num_lives = 6
  }

  
  calculateStatus() {
    const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

    if (this.remainingGuesses === 0) {
      this.status = 'failed'
    } else if (finished) {
      this.status = 'finished'
    } else {
      this.status = 'playing'
    }
  }

  get statusMessage() {
    if (this.status === 'playing') {
      return `chance : ${this.remainingGuesses}`
    } else if (this.status === 'failed') {
      return `You're dead.👻 The word was '${this.word.join('')}'`
    } else if (this.status === 'finished') {
      return 'Great Work! You guessed the word.'
    }
  }

  get puzzle() {
    let puzzle = ''

    this.word.forEach((letter) => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        puzzle += letter
      } else {
        puzzle += '🖤'
      }
    })
    return puzzle
  }
  
  makeGuess(guess) {
    guess = guess.toLowerCase()
    const isUnique = !this.guessedLetters.includes(guess)
    const isBadGuess = !this.word.includes(guess)

    const img = document.getElementById("img");
    let imgCount = 6;
    let num_lives = 6;

    if (this.status !== 'playing') {
      img.setAttribute('src', 'img/hangman0.png');
      return
    }

    if (isUnique) {
      this.guessedLetters.push(guess)
    }

    if (isUnique && isBadGuess) {
      this.remainingGuesses--;
      this.num_lives --;
      console.log(num_lives)
      img.setAttribute('src', 'img/hangman'+ (imgCount-this.num_lives) + '.png');
    }
    this.calculateStatus()
  }
}

export default Hangman;