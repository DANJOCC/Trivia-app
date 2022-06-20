import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {interval} from 'rxjs';
import { CardInfo } from 'src/app/interfaces/card-info';
import { PlayInfo } from 'src/app/interfaces/play-info';


@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  difficult: number;
  playInfo: PlayInfo;
  modo: string;
  time: number;
  sg: number;
  min: number;
  initTime: number;
  progressTime=1;

  constructor(private paramsRutas: ActivatedRoute, private route: Router) { }

  ngOnInit() {
      this.playInfo={
        score:0,
        rigthAnswsers:0,
        difficulty:0,
        final:false
      };
      this.difficult=0;
      this.modo=this.paramsRutas.snapshot.params.modo;
      this.time=this.modo==='rush'? 20:60;
      this.min= this.time<60? 0:1;
      this.sg= this.time<60? 20:0;
      this.initTime=this.time;
      const counter=this.start().subscribe(()=>{
        if(this.time===0){
          counter.unsubscribe();
        }
      });
  }

  changeTime(){
    this.time--;
    this.min=Math.floor(this.time/60);
    this.sg=this.time-this.min*60;
    this.progressTime=this.time/this.initTime;
  }

  start(){
    return interval(1000).pipe(
      map((x: number)=>{
          this.changeTime();
          return x;
      })
    );
  }

  game(card: CardInfo){
    this.addScore(card);
    this.changeDifficult(this.playInfo.rigthAnswsers);
    if(card.lastQuestion){
        this.route.navigate(['/hall']);
    }
  }

  //aumenta el puntuaje

  addScore(card: CardInfo){
    if(card.correctAnswer){
      this.playInfo.rigthAnswsers++;
        if(card.difficult==='easy'){
            this.playInfo.score+=10;
        }
        else if((card.difficult==='medium')){
          this.playInfo.score+=30;
        }
        else{
          this.playInfo.score+=70;
        }
    }
    else{
      this.playInfo.rigthAnswsers=0;
    }
    console.log(this.playInfo.score);
  }

  //cambia dificultad y timer

  changeDifficult(correctAnswers: number){
     if(correctAnswers===0){
          if(this.playInfo.difficulty>0){
            this.playInfo.difficulty--;
          }
     }
     else if(correctAnswers===3){
      this.playInfo.difficulty++;
     }
     else if(correctAnswers>=5){
      if(correctAnswers === 5 && this.modo==='rush'){
        this.time+=20;
      }
      else{
        this.playInfo.difficulty++;
        this.playInfo.rigthAnswsers=0;
      }
     }
     console.log(this.playInfo.difficulty);
     this.difficult=this.playInfo.difficulty;
  }

}
