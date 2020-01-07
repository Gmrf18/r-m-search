import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {

  @Input() listEpisodes: Episode[]

  constructor() { }

  ngOnInit() {
  }

}
