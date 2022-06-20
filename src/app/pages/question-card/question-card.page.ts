import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardInfo } from 'src/app/interfaces/card-info';
import { Question } from 'src/app/interfaces/question';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.page.html',
  styleUrls: ['./question-card.page.scss'],
})

export class QuestionCardPage implements OnInit {
  @Input() mode: string;
  @Output() cardInfo = new EventEmitter<CardInfo>();
  data: any;
  card: Question;
  questionNumber: number;
  constructor(private questionsService: QuestionsService) { }
  ngOnInit() {
    if(this.mode==='rush'){
      this.questionsService.getRushQuestions('easy').subscribe((data: any)=>{
      this.firstQuestion(data);
    });
    }
    else if(this.mode==='normal'){
      this.questionsService.getNormalQuestions('easy').subscribe((data: any)=>{
        this.firstQuestion(data);

      });
    }
  }
  nextQuestion(event: Event){
    const answer=(event.target as HTMLElement).innerHTML;
    this.questionNumber++;
    if(answer===this.card.correctAnswer){

      this.cardInfo.emit({
        difficult:this.card.difficulty,
        correctAnswer: true,});

    }
    if(this.questionNumber<this.data.length){
    this.card={
      difficulty:this.data[this.questionNumber].difficulty,
      question: this.data[this.questionNumber].question,
      correctAnswer:this.data[this.questionNumber].correct_answer,
      incorrectsAnwsers:this.data[this.questionNumber].incorrect_answers
    };
  }
  }
  firstQuestion(data: any[]){
    this.data=data;
    this.questionNumber=0;
    this.card={
      difficulty:this.data[0].difficulty,
      question: this.data[0].question,
      correctAnswer:this.data[0].correct_answer,
      incorrectsAnwsers:this.data[0].incorrect_answers
    };
  }
}
