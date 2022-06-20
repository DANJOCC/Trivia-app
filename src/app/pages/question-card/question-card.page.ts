import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardInfo } from 'src/app/interfaces/card-info';
import { Question } from 'src/app/interfaces/question';
import { QuestionGameService } from 'src/app/services/question-game.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.page.html',
  styleUrls: ['./question-card.page.scss'],
})

export class QuestionCardPage implements OnInit {
  @Input() mode: string;
  @Input() difficulty: number;
  @Output() cardInfo = new EventEmitter<CardInfo>();
  range: string[]=['easy','medium','hard'];
  card: Question;
  data: any;
  constructor(private game: QuestionGameService, private questionService: QuestionsService) { }
  ngOnInit() {
    if(this.mode==='rush'){
      this.questionService.getRushQuestions('easy').subscribe((data: any)=>{ // 2.SE OBTIENEN PRIMERAS PREGUNTAS
      this.card=this.game.gameOn(true,data);
    });
    }
    else{
      this.questionService.getNormalQuestions('easy').subscribe((data: any)=>{
        this.card=this.game.gameOn(false,data);

    });
    }
        console.log(this.card);
    }
    nextQuestion(event: Event){
      const answer=(event.target as HTMLElement).innerHTML;
      this.data=this.game.nextQuestion(answer,this.difficulty,this.card);
      this.cardInfo.emit(this.data[0]);
      this.card=this.data[1];
    }
  }

  //cambio a siguiente pregunta




