import { Injectable } from '@angular/core';
import { WordsService } from './words.service';
import { HangmanGame, GameState } from 'src/hangman/hangmanGame';
import { BehaviorSubject, Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

export interface MoveResultResponse {
  lastLetter:string;
  lastLetterGuessedCorrectly:boolean;
  incorrectMovesCount:number;
  selectedLetters:string[];
  selectedWord:string;
  visibleWord:string[];
  gameState:GameState;
  incorrectLetters:string[];
} 

export enum IncorrectMove {
  duplicateLetter,
  gameEnded
}

export interface IncorrectMoveResponse {
  message:string;
  type:IncorrectMove
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameInstance:HangmanGame
  private movesResultSubject:BehaviorSubject<MoveResultResponse> = new BehaviorSubject(null)
  private incorrectMoveSubject:BehaviorSubject<IncorrectMoveResponse> = new BehaviorSubject(null)
  private visibleWordSubject:BehaviorSubject<string[]> = new BehaviorSubject(null)
  moveResult$:Observable<MoveResultResponse> = this.movesResultSubject.asObservable()
  visibleWord$:Observable<string[]> = this.visibleWordSubject.asObservable()
  
  constructor(private wordsService:WordsService,  private message: NzMessageService) {
   }

  startNewGame() {
    const words = this.wordsService.getWords()
    this.gameInstance = new HangmanGame(words, 6)
    this.gameInstance.startGame()
    this.visibleWordSubject.next(this.gameInstance.visibleWord)
  }


  guessLetter(letter:string) {
    try {
      this.gameInstance.guessLetter(letter)
      
      this.movesResultSubject.next(this.buildResponseObject())
      this.visibleWordSubject.next(this.gameInstance.visibleWord)
      this.handleGameEnd()
    } catch (error) {
      this.incorrectMoveSubject.next({ message: error.message, type:IncorrectMove.gameEnded })
      if(this.gameInstance.gameState === GameState.won) {
        this.message.info('You have won ! Please reload browser to play again.')
      } else {
        this.message.error(error.message)
      }
    }
  }

  private buildResponseObject():MoveResultResponse {
    return {
      selectedWord:this.gameInstance.selectedWord,
      visibleWord:this.gameInstance.visibleWord,
      gameState:this.gameInstance.gameState,
      incorrectMovesCount:this.gameInstance.incorrectTriesCount,
      selectedLetters:this.gameInstance.tries.map(el => el.letter),
      lastLetterGuessedCorrectly:this.gameInstance.lastMove.correct,
      lastLetter:this.gameInstance.lastMove.letter,
      incorrectLetters:this.gameInstance.tries.filter(el => !el.correct).map(el => el.letter)
    }

  }

  private handleGameEnd() {
    if(this.gameInstance.gameState === GameState.won) {
      this.message.success('You have won !')
    }

    if(this.gameInstance.gameState === GameState.lost) {
      this.message.info('You lost ! Try again.')
    }

  }


}
