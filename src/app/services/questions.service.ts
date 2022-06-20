import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class QuestionsService {
  private questionsURl = 'https://trivia-api-projecto1.herokuapp.com';
  constructor(private httpClient: HttpClient) { }


  getNormalQuestions(difficult: string): Observable<any>{
     return this.httpClient.get(this.questionsURl+'/normal_questions',{
        params:{
          difficulty:difficult,
        }
      });
  }
  getRushQuestions(difficult: string): Observable<any>{
    return this.httpClient.get(this.questionsURl+'/rush_questions',{
       params:{
         difficulty: difficult,
         amount:10
       }
     });
 }

}
