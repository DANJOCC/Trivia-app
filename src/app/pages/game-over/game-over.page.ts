import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayInfo } from 'src/app/interfaces/play-info';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.page.html',
  styleUrls: ['./game-over.page.scss'],
})
export class GameOverPage implements OnInit {
  score: number;
  modo: string;
  user: string;
  constructor(private paramsRutas: ActivatedRoute, private ranking: RankingService) { }

  ngOnInit() {
    this.score=this.paramsRutas.snapshot.params.score;
    this.modo=this.paramsRutas.snapshot.params.modo;
    this.user=this.paramsRutas.snapshot.params.user;
    const data={
      username:this.user,
      category:this.modo,
      score: this.score
    };
    console.log(data.score);
    this.newScore(data);
  }
  newScore(data: any){
    this.ranking.newScore(data).subscribe((response: string)=>{
      console.log(response);
    }
    );
  }
}
