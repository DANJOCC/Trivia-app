import { Component, Input, OnInit } from '@angular/core';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  @Input() mode: string;
  data: any;
  constructor(private rankings: RankingService) { }

  ngOnInit() {
    this.rankings.getBestScores(this.mode).subscribe((data: any)=>{
      this.data=data;
    });
  }

}
