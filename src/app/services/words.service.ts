import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  // Repository for words. Gives random word. 
  private wordsSubject:BehaviorSubject<string[]> = new BehaviorSubject(['hello', 'elephant', 'mouse', 'telephone' ])
  words$ = this.wordsSubject.asObservable()

  constructor() { }

  getWords() {
    return this.wordsSubject.getValue()
  }
  
}
