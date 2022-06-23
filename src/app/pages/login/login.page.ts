import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserHttpService } from '../../services/http/user-http.service';
import { BasicService } from 'src/app/services/basic/basic.services';
import { LoginUser } from 'src/app/interfaces/login-user.model';
import { Response } from 'src/app/interfaces/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private bs: BasicService,
    private router: Router,
    private uHttpS: UserHttpService) {

  }


  //life
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.bs.nullUserOnSession();
  }
  ionViewDidEnter() {
  }

  ionViewWillLeave() {
  }

  ionViewDidLeave() {

  }


  public login(username: string | number,password: string | number){
    if(!this.bs.checkField([username,password])){
      this.bs.alert('Fields','Please write email or password',[{text:'ok'}]);
    }else{
     const data: LoginUser={username,password};
      this.bs.loading('Loading',5000);
      this.uHttpS.login(data).subscribe((daeta: any)=>{
        const user = daeta;
        console.log(user.username);
        this.router.navigate(['/hall', user.username]);
      });
    }
  }

}
