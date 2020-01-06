import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { race, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getEpisodesBySeason(q: string):Observable<any> {
    return this.http.get(`${environment.urlAPI}/episode/?episode=${q}`)
  }
  getEpisodesByName(q: string) {
    q = `${q}`
    return this.http.get(`${environment.urlAPI}/episode/?name=${q}`)
  }
  getEpisode(q: string): Observable<any> {
    return this.http.get(`${environment.urlAPI}/episode/${q}`).pipe(catchError(null))
  }
  getCharactersByName(q: string) {
    q = `${q}`
    return this.http.get(`${environment.urlAPI}/character/?name=${q}`)
  }
  getCharacter(q: string) {
    return this.http.get(`${environment.urlAPI}/character/${q}`)
  }

  getAny(q: string) {
    const oneEpisodeR = /^\d{1,2}$/
    const episodeSeasonR = /S0/

    switch (true) {
      case oneEpisodeR.test(q):
        return this.getEpisode(q).pipe(map(x => [x]))
      case episodeSeasonR.test(q):
        return this.getEpisodesBySeason(q)
      default:
        const episodeName = this.getEpisodesByName(q)
        const charactersname = this.getCharactersByName(q)
        const resp = race(
          charactersname,
          //episodeName
        )
        return resp
    }
  }

}
