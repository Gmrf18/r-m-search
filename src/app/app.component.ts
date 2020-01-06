import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Characters, Character } from './interfaces/characters.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput', { static: false }) SearchInput: ElementRef;

  cards: Character[]
  public categories = [{name: 'all', id: 1}, {name: 'Episodes', id: 2}, {name: 'Characters', id: 3}]
  isSearching: boolean;
  paginator: any;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {

    this.apiService.getAny('rick').subscribe((x: Characters) => {
      this.paginator = x
      this.cards = x.results
      console.log(x.results);

    })
  }


  ngAfterViewInit() {
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
      console.log('changed');

      this.isSearching = true;
      text = text.toUpperCase()
      console.log(text);
      this.apiService.getAny(text).subscribe((x: Characters) => {
        this.paginator = x
        this.cards = x.results
        console.log(x.results);

      })
    });
  }
}

