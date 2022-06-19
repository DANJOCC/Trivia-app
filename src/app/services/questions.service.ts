import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class QuestionsService {
  private questionsURl = 'https://trivia-api-projecto1.herokuapp.com/rush_questions';
  constructor(private httpClient: HttpClient) { }


  getRushQuestions(): Observable<any>{
     return this.httpClient.post(this.questionsURl,{
        difficulty:'easy',
        amount:'3'
      }, {responseType: 'json'});
  }

}
