import { Component, OnInit, HostListener } from '@angular/core';
import { GameService, MoveResultResponse } from './services/game.service';
import { tap, map, filter } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-hangman';
  moveResult: MoveResultResponse
  visibleWord$:Observable<string[]>
  wrongLetters$:Observable<string[]>
  incorrectMovesCount$:Observable<number>
  constructor(private gameService: GameService) {

  }

  ngOnInit(): void {
    this.visibleWord$ = this.gameService.visibleWord$.pipe(tap(console.log))
    this.wrongLetters$ = this.gameService.moveResult$.pipe(
      filter(res => !!res),
      map((res:MoveResultResponse) => {
       return res.incorrectLetters
      })
    )

    this.incorrectMovesCount$ = this.gameService.moveResult$.pipe(
      filter(res => !!res),
        map((res:MoveResultResponse) => {
       return res.incorrectMovesCount
      })
    )

    // this.gameService.moveResult$.pipe(
    //   tap(r => this.moveResult = r),
    //   tap(console.log)
    // ).subscribe()
    
    this.gameService.startNewGame()

  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event:KeyboardEvent) {
    this.gameService.guessLetter(event.key)
  }
}
