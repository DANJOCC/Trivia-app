import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user.model';
import { Pass } from 'src/app/interfaces/pass.model';
import { LoginUser } from 'src/app/interfaces/login-user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  private urlx = 'http://localhost:8000/user/';
  private url = 'https://trivia-api-projecto1.herokuapp.com/';


  constructor(
    private http: HttpClient
  ) {

  }

  public logout() {
    return this.http.get(this.url + 'singout').toPromise();
  }

  public getUserById() {
    return this.http.get(this.url + sessionStorage.user.id).toPromise();
  }

  public login(data: LoginUser) {
    return this.http.post(this.url + 'login', data).toPromise();
  }

  public register(data: User): Observable<any> {
    return this.http.post(this.url + 'register', {
      username:data.username,
      email:data.email,
      password:data.password
    }, {responseType: 'text'});
  }
}
