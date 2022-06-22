import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private  apiUrl = 'https://trivia-api-projecto1.herokuapp.com';
  constructor(private httpClient: HttpClient) { }

  getBestScores(modo: string): Observable<any>{
    return this.httpClient.get(this.apiUrl+'/bestScores', {params: {
      mode:modo
    }});
  }
}
