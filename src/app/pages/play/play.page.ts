import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import {interval} from 'rxjs';


@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  modo: string;
  time: number;
  sg: number;
  min: number;
  initTime: number;
  progressTime=1;
  constructor(private paramsRutas: ActivatedRoute) { }

  ngOnInit() {
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

}
