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
    private bs:BasicService,
    private router:Router, 
    private uHttpS:UserHttpService
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

  ngOnDestroy() {
    
  }

 public register(user:string,email:string,password:string,confirmPassword:string) {
    if(!this.bs.checkField([user,email,password,confirmPassword])){
      this.bs.alert('Fields','Please write on all fields',[{text: 'OK'}]);
    }else{
      let  data :User = {user ,email,password,confirmPassword,id:null};
      this.bs.loading('Loading...',3000);
      this.uHttpS.register(data).then((res:Response) =>{
        switch(res.typeResponse){
          case 'Success':
            this.bs.toast(res.message,2000,'top');
            data.id=res.body.id;
            this.bs.setUserOnSession(data);
            this.router.navigate(['/login']);
            break;
            case 'Fail':
              this.bs.toast(res.message,5000,'top');
              res.body.errors.forEach(element=>{
                this.bs.toast(element.text,3000,'top');
              });
              break;

              default: 
              this.bs.alert(res.typeResponse,res.message,[{text:'ok'}]);
              break;

        }
      },(err)=>{console.log('Error:',err);
    this.bs.alert('Fatal error',err,[{text:'ok'}]);
    });
    }
  }
}
