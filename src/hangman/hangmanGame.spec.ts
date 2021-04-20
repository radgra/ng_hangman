import { TestBed } from '@angular/core/testing';
import { HangmanGame, InvalidActionError, InvalidLetterError } from './hangmanGame';


fdescribe('HangmanGame', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const hangman: HangmanGame = new HangmanGame(['olek', 'bolek']);
    expect(hangman).toBeTruthy();
  });

  it('should start game', () => {
    const hangman: HangmanGame = new HangmanGame(['olek']);
    hangman.startGame()
    expect(hangman.selectedWord).toBe('olek');
  });

  it('should guess letters', () => {
    const hangman: HangmanGame = new HangmanGame(['olek']);
    hangman.startGame()
    hangman.guessLetter('i') 
    expect(hangman.tries.length).toBe(1);
    expect(hangman.incorrectTriesCount).toBe(1);
    
    hangman.guessLetter('d') 
    expect(hangman.incorrectTriesCount).toBe(2);
    
    hangman.guessLetter('o') 
    expect(hangman.incorrectTriesCount).toBe(2);
    expect(hangman.tries.length).toBe(3);
  });


  it('should correctly set visible word', () => {
    const hangman: HangmanGame = new HangmanGame(['olek']);
    hangman.startGame()
    hangman.guessLetter('i')     
    hangman.guessLetter('d') 
    hangman.guessLetter('o') 

    expect(hangman.visibleWord).toEqual(['o',null,null,null]);
    
  });

  it('should correctly display missing letters', () => {
    const hangman: HangmanGame = new HangmanGame(['olek']);
    hangman.startGame()  
    hangman.guessLetter('i')     
    hangman.guessLetter('d') 
    hangman.guessLetter('o')
    expect(hangman.missingLetters).toEqual(['l','e','k']);
  });

  it('should correctly handle game state Lost', () => {
    const hangman: HangmanGame = new HangmanGame(['olek'], 3);
    hangman.startGame()  
    hangman.guessLetter('i')     
    hangman.guessLetter('d') 
    hangman.guessLetter('o')
    hangman.guessLetter('z')
    expect(hangman.gameState).toEqual(1);
  });

  it('should correctly handle game state Won', () => {
    const hangman: HangmanGame = new HangmanGame(['olek']);
    hangman.startGame()  
    hangman.guessLetter('l')     
    hangman.guessLetter('e') 
    hangman.guessLetter('o')
    hangman.guessLetter('k')
    expect(hangman.gameState).toEqual(2);
  });

  it('should prevent from making move after game ended', () => {
    const hangman: HangmanGame = new HangmanGame(['olek']);
    hangman.startGame()  
    hangman.guessLetter('l')     
    hangman.guessLetter('e') 
    hangman.guessLetter('o')
    hangman.guessLetter('k')

    expect(() => hangman.guessLetter('z')).toThrowError(InvalidActionError)     

  });

  it('should prevent from guessing already guessed letter', () => {
    const hangman: HangmanGame = new HangmanGame(['olek']);
    hangman.startGame()   
    hangman.guessLetter('l')     
    hangman.guessLetter('e') 

    expect(() => hangman.guessLetter('l')).toThrowError(InvalidLetterError)   
  });




});
