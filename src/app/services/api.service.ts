import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getEpisodesBySeason(q: string): Observable<any> {
    return this.http.get(`${environment.urlAPI}/episode/?episode=${q}`)
  }
  getEpisodesByName(q: string) {
    q = `${q}`
    return this.http.get(`${environment.urlAPI}/episode/?name=${q}`)
  }
  getEpisode(q: string): Observable<any> {
    return this.http.get(`${environment.urlAPI}/episode/${q}`)
  }
  getCharactersByName(q: string) {
    q = `${q}`
    return this.http.get(`${environment.urlAPI}/character/?name=${q}`)
  }
  getCharacter(q: string) {
    return this.http.get(`${environment.urlAPI}/character/${q}`)
  }

  getCharacters(q: string) {
    const characterIdR = /^\d{1,3}$/
    return characterIdR.test(q) && q.length > 0 ?
      this.getCharacter(q).pipe(map(x => {
        return {
          results: [x]
        }
      })) : this.getCharactersByName(q)
  }

  getEpisodes(q: string) {
    const episodeSeasonR = /S0/
    return episodeSeasonR.test(q)
      ? this.getEpisodesBySeason(q)
      : this.getEpisode(q).pipe(map(x => { results: [x]  }))
  }

  getPage(q) {
    q = `${q}`
    console.log(q);
    return this.http.get(q)
  }

}
