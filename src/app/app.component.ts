import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Characters, Character } from './interfaces/characters.interface';
import { Paginator } from './interfaces/paginator.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput', { static: false }) SearchInput: ElementRef;
  messages = ['Search character', 'Search episode']
  mode = {
    flag: false,
    messages: ['Search character', 'Search episode'],
    message: this.messages[0]
  }
  cardsCharacter: Character[]
  listEpisodes: Episode[]
  isSearching: boolean;
  paginator: Info
  pageIndex = 0
  constructor(private apiService: ApiService) {
  }
  ngOnInit() {
    this.getEpisode('?page=2', true)
  }
  ngAfterViewInit() {
    this.searchInit()
  }

  searchInit() {
    fromEvent(this.SearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 0
      , filter(res => res.length > 0)
      // Time in milliseconds between key events
      , debounceTime(1500)
      // If previous query is diffent from current
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {
      this.isSearching = true;
      text = text.toUpperCase()
      !this.mode.flag ? this.getCharacters(text) : this.getEpisodes(text)
    });
  }

  getCharacters(text) {
    this.apiService.getCharacters(text).subscribe((x: Characters) => {
      this.setCards(x)
    })
  }
  getCharacter(q) {
    this.apiService.getCharacter(q).subscribe((x: Characters) => {
      this.setCards(x)
    })
  }
  getEpisodes(text) {
    this.apiService.getEpisodes(text).subscribe((x: Episodes) => {
      this.setList(x)
    })
  }
  getEpisode(q, init?: boolean) {
    this.apiService.getEpisode(q).subscribe((x: Episodes) => {
      this.setList(x)
      if (init) {
        const charactersLastEpisode = x.results[x.results.length - 1].characters
          .map(x => x.substring(x.lastIndexOf('/') + 1)).join(',')
        this.getCharacter(charactersLastEpisode)
      }
    })
  }
  changeMode() {
    this.mode.flag = !this.mode.flag
    const selectedMode = Number(this.mode.flag)
    this.mode.message = this.messages[selectedMode]
  }
  setList(x: Episodes) {
    console.log(x);
    this.paginator = x.info
    this.listEpisodes = x.results
  }
  setCards(x: Characters) {
    this.paginator = x.info || undefined
    this.cardsCharacter = x.results || x as any;
  }
  getPage(pageIn: Paginator) {

    let page = ''
    if (this.pageIndex < pageIn.pageIndex) {
      page = this.paginator.next
      this.pageIndex++
    } else {
      page = this.paginator.prev
      this.pageIndex--
    }
    this.apiService.getPage(page).subscribe((x: Episodes | Characters) => {
      this.mode.flag ? this.setList(x as Episodes) : this.setCards(x as Characters)
    })
  }
}

