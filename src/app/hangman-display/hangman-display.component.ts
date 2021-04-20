import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrls: ['./hangman-display.component.scss']
})
export class HangmanDisplayComponent implements OnInit {
  @Input() counter:number
  constructor() { }

  ngOnInit() {
  }

}
