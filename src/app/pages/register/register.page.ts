import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/services/ranking.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/interfaces/response.model';
import { User } from 'src/app/interfaces/user.model';
import { BasicService } from 'src/app/services/basic/basic.services';
import { UserHttpService } from '../../services/http/user-http.service';
@Component({

  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {



  constructor(
    private bs: BasicService,
    private router: Router,
    private uHttpS: UserHttpService
  ) { }

 //LIFE
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.bs.loading('Loading...', 2000);
    this.bs.nullUserOnSession();

  }

  ionViewDidEnter() {

  }

  ionViewWillLeave() {

  }

  ionViewDidLeave() {

  }

 public register(username: string | number,email: string | number,password: string | number,confirmPassword: string | number) {
    if(!this.bs.checkField([username,email,password,confirmPassword])){
      this.bs.alert('Fields','Please write on all fields',[{text: 'OK'}]);
    }else{
      const data: User = {username ,email,password,confirmPassword,id:null};
      this.bs.loading('Loading...',3000);
      this.uHttpS.register(data).subscribe(( deata: any)=>{
            console.log(deata);
      });
    }
  }
}
