import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {interval, timer} from 'rxjs';
import { CardInfo } from 'src/app/interfaces/card-info';
import { PlayInfo } from 'src/app/interfaces/play-info';


@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  difficult: number;                           //dificultad de la tarjeta
  playInfo: PlayInfo;                          //Informacion general del estado del juego
  modo: string;                                //modo en el cual se juega
  time: number;                                //tiempo del reloj (segundos)
  sg: number;                                  //segundos
  min: number;                                 //minutos
  initTime: number;                            //tiempo inicial
  progressTime=1;                              //valor de barra de tiempo

  constructor(private paramsRutas: ActivatedRoute, private route: Router) { }

  ngOnInit() {
      this.playInfo={ //estado inicial de juego
        score:0,
        rigthAnswers:0,
        difficulty:0,
        final:false
      };
      this.difficult=0;
      this.modo=this.paramsRutas.snapshot.params.modo;// se guarda el modo del juego paso en la ruta
      this.time=this.modo==='rush'? 20:60;//se configura el reloj
      this.min= this.time<60? 0:1;
      this.sg= this.time<60? 20:0;
      this.initTime=this.time;
      const counter=this.start().subscribe(()=>{//empieza a contar
        if(this.time===0){
          counter.unsubscribe();
        }
      });
  }

  changeTime(){//cambia el tiempo
    this.time--;
    this.min=Math.floor(this.time/60);
    this.sg=this.time-this.min*60;
    this.progressTime=this.time/this.initTime;
  }

  start(){//inicia el reloj
    return interval(1000).pipe(
      map((x: number)=>{
          this.changeTime();
          return x;
      })
    );
  }


  //game, cambia el estado del juego, obtiene informacion del child component

  game(card: CardInfo){
    if(typeof card.lastQuestion !== 'undefined'){
      if(card.lastQuestion) {this.route.navigate(['/hall']);}
    }
    this.playInfo.difficulty=this.difficult;
    this.addScore(card);
    this.addTime();
  }

  //aumenta el puntuaje

  addScore(card: CardInfo){
    if(card.correctAnswer){
        if(this.playInfo.difficulty===0){
            this.playInfo.score+=10;
        }
        else if(this.playInfo.difficulty===1){
          this.playInfo.score+=30;
        }
        else{
          this.playInfo.score+=70;
        }
        this.playInfo.rigthAnswers++;
    }
    else{
      this.playInfo.rigthAnswers=0;
    }
    console.log(this.playInfo.score);
  }

  //agrega tiempo al reloj

  addTime(){
    if(this.playInfo.rigthAnswers === 5 && this.modo==='rush') {this.time+=20;}
  }

}
