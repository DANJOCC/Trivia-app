import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayInfo } from 'src/app/interfaces/play-info';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.page.html',
  styleUrls: ['./game-over.page.scss'],
})
export class GameOverPage implements OnInit {
  score: number;
  modo: string;
  constructor(private paramsRutas: ActivatedRoute) { }

  ngOnInit() {
    this.score=this.paramsRutas.snapshot.params.score;
    this.modo=this.paramsRutas.snapshot.params.modo;
  }

}
