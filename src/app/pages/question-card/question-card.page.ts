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
  @Input() mode: string;                                          //modo del juego
  @Input() difficulty: number;                                    //dificultad de la tarjeta (TWO-WAY BINDING)
  @Output() difficultyChange= new EventEmitter<number>();         //notifica al padre de un cambio de dificultad
  @Output() cardInfo = new EventEmitter<CardInfo>();              //notifica al padre de un cambio de tarjeta
  range: string[]=['easy','medium','hard'];                       // rango de dificultad de preguntas
  card: Question;                                                 //tarjeta
  data: any | CardInfo;                                           // Preguntas

  constructor(private game: QuestionGameService, private questionService: QuestionsService) { //servicios de juego y preguntas
  }

  ngOnInit() {
    if(this.mode==='rush'){
      this.questionService.getRushQuestions('easy').subscribe((data: any)=>{ // se obtienen preguntas iniciales; se inicia el juego
      this.card=this.game.gameOn(true,data);
    });
    }
    else{
      this.questionService.getNormalQuestions('easy').subscribe((data: any)=>{
        this.card=this.game.gameOn(false,data);

    });
    }
    }
    nextQuestion(event: Event){//cambio a siguiente pregunta

      const answer=(event.target as HTMLElement).innerHTML;//se obtiene respuesta
      this.data=this.game.correctAnswers(answer, this.card);// se obtiene aciertos
      this.changeDifficulty(this.data[1]);//cambio de dificultad

    }

    changeDifficulty(ritghs: number){//se cambia dificultad o no, y se emiten los estados de juego y las cartas
      switch (ritghs) {              //cada tres preguntas un cambio, una respuesta mala y se cambia
        case 0:
          if(this.difficulty>0){
            this.difficulty--;
          if(this.mode==='rush'){
            this.questionService.getRushQuestions(this.range[this.difficulty]).subscribe((data: any)=>{
            this.card=this.game.firstQuestion(data);
          });
          }
          else{
            this.questionService.getNormalQuestions(this.range[this.difficulty]).subscribe((data: any)=>{
              this.card=this.game.firstQuestion(data);

          });
          }
        }
        else{
          this.card=this.game.nextQuestion(this.difficulty,this.card);
        }
          break;
        case 3:
        case 6:
          this.difficulty++;
          if(this.mode==='rush'){
            this.questionService.getRushQuestions(this.range[this.difficulty]).subscribe((data: any)=>{
            this.card=this.game.firstQuestion(data);
          });
          }
          else{
            this.questionService.getNormalQuestions(this.range[this.difficulty]).subscribe((data: any)=>{
              this.card=this.game.firstQuestion(data, true);

          });
          }
          break;
        default:
          this.card=this.game.nextQuestion(this.difficulty,this.card);
          break;
      }
      this.cardInfo.emit(this.data[0]);
      this.difficultyChange.emit(this.difficulty);
    }
  }







