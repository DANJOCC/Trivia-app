import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {interval, timer} from 'rxjs';
import { CardInfo } from 'src/app/interfaces/card-info';
import { PlayInfo } from 'src/app/interfaces/play-info';
import { IonModal } from '@ionic/angular';
import { RankingService } from 'src/app/services/ranking.service';


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
  points: number;
  rigths: number;
  constructor(private paramsRutas: ActivatedRoute, private route: Router, private ranking: RankingService) { }

  ngOnInit() {
      this.playInfo={ //estado inicial de juego
        score:0,
        rigthAnswers:0,
        difficulty:0,
        final:false
      };
      this.points=0;
      this.difficult=0;
      this.modo=this.paramsRutas.snapshot.params.modo;// se guarda el modo del juego paso en la ruta
      this.time=this.modo==='rush'? 20:60;//se configura el reloj
      this.min= this.time<60? 0:1;
      this.sg= this.time<60? 20:0;
      this.initTime=this.time;
      const counter=this.start().subscribe(()=>{//empieza a contar
        if(this.time===0){
          counter.unsubscribe();
          this.route.navigate(['game-over',this.modo,this.playInfo.score]);
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
      if(card.lastQuestion){
        const newScore=this.rigths+(this.difficult*10)+this.playInfo.score+(this.time*100)+this.points*1000;//agregar nueva puntuacion
        this.route.navigate([`game-over/${this.modo}/${newScore}`]);//fin del juego
      }
      else{
        this.playInfo.difficulty=this.difficult;
        this.addScore(card);
        this.addTime();
      }
    }
  }

  //aumenta el puntuaje

  addScore(card: CardInfo){
    if(card.correctAnswer){
        this.points++;
        this.rigths++;
        if(this.playInfo.difficulty===0){
            this.playInfo.score+=1;
        }
        else if(this.playInfo.difficulty===1){
          this.playInfo.score+=3;
        }
        else{
          this.playInfo.score+=7;
        }
        this.playInfo.rigthAnswers++;
    }
    else{
      this.playInfo.rigthAnswers=0;
      this.points--;
    }
  }

  //agrega tiempo al reloj

  addTime(){
    if(this.playInfo.rigthAnswers === 5 && this.modo==='rush') {this.time+=20;}
  }

}
