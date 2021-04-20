export class HangmanGame {
    private calculateRandomInteger: (max: number) => number
    tries:Try[] = []
    selectedWord:string
    gameState:GameState = null
    visibleWord:string[]

    constructor(private words:string[], private maxAllowedMistakes:number = 5) {
        this.calculateRandomInteger = calculateRandomInteger
    }

    startGame() {
        this.selectedWord = this.getRandomWord()
        this.gameState = GameState.started
        this.calculateVisibleWord()
        
    }

    guessLetter(letter:string) {
        //0.
        if(this.gameState !== GameState.started) {
            throw new InvalidActionError('Game ended')
        }

        //1. check if letter alredy guessed throw error
        const letterExists = this.tries.some(t => t.letter === letter );
        if(letterExists) throw new InvalidLetterError('Letter already selected')
        
        //2 find it in word and push to array
        const newTry:Try = {letter:letter, correct:false}
        if(this.selectedWord.includes(letter)) {
            newTry.correct = true
        }  else {
            newTry.correct = false
        }
        this.tries.push(newTry)
        this.calculateVisibleWord()

        this.checkGameState()
    }

    private getRandomWord() {  
        const randomInteger = this.calculateRandomInteger(this.words.length)
        return this.words[randomInteger]
    }

    private checkGameState() {
        if (this.incorrectTriesCount >= this.maxAllowedMistakes) {
            this.gameState = GameState.lost
        }

        if(this.missingLetters.length === 0) {
            this.gameState = GameState.won
        }
    }


    private calculateVisibleWord() {
        const letterList = this.selectedWord.split('')
        const result = letterList.map(letter => {
            const exists = this.tries.some(t => t.letter === letter)
            if(exists) {
                return letter
            } else {
                return null
            }
        })
        this.visibleWord = result
    }

    get incorrectTriesCount():number {
        return this.tries.filter(t => !t.correct).length
    }

    get missingLetters():string[] {
        const letterList = this.selectedWord.split('')
        const result = letterList.filter(letter => {
            const exists = this.tries.some(t => t.letter === letter)
            if(!exists) {
                return true
            }
        })
        return result
    }

    get lastMove() {
        return [...this.tries].pop()
    }
}




function  calculateRandomInteger(max:number):number {
    const result = Math.floor(Math.random()*max)
    return result
  }


interface Try {
    letter:string;
    correct:boolean
}

export enum GameState {
    started,
    lost,
    won
}


export class InvalidLetterError extends Error {
    constructor(message) {
      super(message); // (1)
      this.name = "InvalidLetterError"; // (2)
    }
  }

export class InvalidActionError extends Error {
constructor(message) {
    super(message); // (1)
    this.name = "InvalidActionError"; // (2)
}
}