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
    private bs:BasicService,
    private router:Router,
    private uHttpS:UserHttpService) { 

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

  ngOnDestroy() {
    
  }

  public login(email:string,password:string){
    if(!this.bs.checkField([email,password])){
      this.bs.alert('Fields','Please write email or password',[{text:'ok'}]);
    }else{
      let  data: LoginUser={email,password};
      this.bs.loading('Loading',5000);
      this.uHttpS.login(data).then((res:Response)=>{
        switch(res.typeResponse){
          case 'Success': 
          this.bs.toast(res.message,2000,'top');
          this.bs.setUserOnSession(res.body[0]);
          this.router.navigate(['/play']);
          case 'Fail':
            this.bs.toast(res.message,5000,'top');
            res.body.errors.forEach(element =>{
              this.bs.toast(element.message,3000,'top');
            });
            break;

            default:
              this.bs.alert(res.typeResponse,res.message,[{text:'ok'}]);
              break;
        }
      },(err)=>{console.log('Error',err);
    this.bs.alert('Fatal error',err,[{text:'ok'}])
    });
    }
  }

}
