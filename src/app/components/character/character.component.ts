import { Component, OnInit, Input } from '@angular/core';
import { Character } from 'src/app/interfaces/characters.interface';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() cardsCharacter: Character[]

  constructor() { }

  ngOnInit() {
  }

}
