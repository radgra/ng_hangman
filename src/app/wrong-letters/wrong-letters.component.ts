import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wrong-letters',
  templateUrl: './wrong-letters.component.html',
  styleUrls: ['./wrong-letters.component.scss']
})
export class WrongLettersComponent implements OnInit {
  @Input() letters:string[]
  constructor() { }

  ngOnInit() {
  }

}
