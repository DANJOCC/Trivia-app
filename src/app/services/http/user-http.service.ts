import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user.model';
import { Pass } from 'src/app/interfaces/pass.model';
import { LoginUser } from 'src/app/interfaces/login-user.model';


@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private urlx = 'http://localhost:8000/user/';
  private url = 'https://trivia-api-projecto1.herokuapp.com/';
  private requestOptions = { headers: { 'Content-Type': 'application/json' } }

  constructor(
    private http: HttpClient
  ) { 

  }

  public logout() {
    return this.http.get(this.url + 'singout', this.requestOptions).toPromise();
  }

  public getUserById() {
    return this.http.get(this.url + sessionStorage.user.id, this.requestOptions).toPromise();
  }

  public login(data: LoginUser) { 
    return this.http.post(this.url + 'login', data, this.requestOptions).toPromise();
  }

  public register(data: User) { 
    return this.http.post(this.url + 'register', data, this.requestOptions).toPromise();
  }
}