import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/interfaces/question';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.page.html',
  styleUrls: ['./question-card.page.scss'],
})

export class QuestionCardPage implements OnInit {

  data: any;
  card: Question;
  constructor(private questionsService: QuestionsService) { }
  ngOnInit() {
    this.questionsService.getRushQuestions().subscribe((data: any)=>{
      this.data=data.results[0];
      this.card={
        question: this.data.question,
        correctAnswer:this.data.correct_answer,
        incorrectsAnwsers:this.data.incorrect_answers
      };
    });
  }

}
