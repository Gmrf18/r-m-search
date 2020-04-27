import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Episode } from 'src/app/interfaces/episodes.interface';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {

  @Input() listEpisodes: Episode[]
  @Output() oCharacters: EventEmitter<string[]> = new EventEmitter()

  panelOpenState = false;
  constructor() { }

  ngOnInit() {
  }

  goToEpisodeCharacters(characters: string[]) {
    this.oCharacters.next(characters)
  }

}
