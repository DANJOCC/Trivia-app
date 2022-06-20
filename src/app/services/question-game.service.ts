import { Injectable } from '@angular/core';
import { CardInfo } from '../interfaces/card-info';
import { Question } from '../interfaces/question';
import { QuestionsService } from './questions.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionGameService {
  card: Question;
  data: any;
  questionNumber: number;
  range: string[]=['easy','medium','hard'];
  mode: boolean;
  questionNumberNormal: number| undefined;

  constructor(private questionService: QuestionsService){
  }


  //1.INICIA EL JUEGO

  gameOn(mode: boolean, data: any){
    this.mode=mode;

    this.questionNumberNormal= mode? undefined:0;
    this.card=this.firstQuestion(data);

  return this.card;

  }

  firstQuestion(data: any){ //3. SE COPIAN LAS PREGUNTAS OBTENIDASS

    this.data=data;
    this.questionNumber=0;
    return {
      difficulty:this.data[0].difficulty,
      question: this.data[0].question,
      correctAnswer:this.data[0].correct_answer,
      incorrectsAnwsers:this.data[0].incorrect_answers
    };
  }

  nextQuestion(answer: string, difficult, card: Question){ //4 Y 5. SE RESPONDE LA PREGUNTA Y SE AUMENTA EN 1 EL NUMERO DE RESPONDIDAS
    this.questionNumber++;
    const tempCard: Question=card;

    if(this.mode){
      if(this.questionNumber<10){ //6. SE CAMBIA A LA SIGUIENTE PREGUNTA SI DIFICULTA ES LA MISMA Y AUN QUEDAN EN FILA
        if(this.range[difficult]===this.data[this.questionNumber].difficulty){//7. DIFICULTAD CAMBIA SI/NO
          this.card={
            difficulty:this.data[this.questionNumber].difficulty,
            question: this.data[this.questionNumber].question,
            correctAnswer:this.data[this.questionNumber].correct_answer,
            incorrectsAnwsers:this.data[this.questionNumber].incorrect_answers
            };
         }
        else{//7.5 DIFICULTAD CAMBIO, CONSEGUIR NUEVAS PREGUNTAS, IR A 3
          this.questionService.getRushQuestions(this.range[difficult]).subscribe((data: any)=>{
            this.card=this.firstQuestion(data);
          });
        }
      }
      else{
        this.questionService.getRushQuestions(this.range[difficult]).subscribe((data: any)=>{//6.5 NO QUEDAN PREGUNTAS EN FILA, IR A 3
          this.card=this.firstQuestion(data);
        });
      }
      if(answer===tempCard.correctAnswer){//8. VERIFICAR SI PREGUNTA ANTERIOR ES CORRECTA
        return[{
          difficult:tempCard.difficulty,
          correctAnswer: true,
          lastQuestion:false},
          this.card];
                                              //9. Enviar respuesta
      }
      else{
        return[{
          difficult:tempCard.difficulty,
          correctAnswer: false,
          lastQuestion:true},
          this.card];
      }
    }
    else{
      this.questionNumberNormal++;
      console.log(this.questionNumberNormal);
      if(this.questionNumberNormal<10){ //6. SE CAMBIA A LA SIGUIENTE PREGUNTA SI DIFICULTA ES LA MISMA Y AUN QUEDAN EN FILA
        if(this.range[difficult]===this.data[this.questionNumber].difficulty){//7. DIFICULTAD CAMBIA SI/NO
          this.card={
            difficulty:this.data[this.questionNumber].difficulty,
            question: this.data[this.questionNumber].question,
            correctAnswer:this.data[this.questionNumber].correct_answer,
            incorrectsAnwsers:this.data[this.questionNumber].incorrect_answers
            };

         }
        else{//7.5 DIFICULTAD CAMBIO, CONSEGUIR NUEVAS PREGUNTAS, IR A 3
          this.questionService.getRushQuestions(this.range[difficult]).subscribe((data: any)=>{
           this.card=this.firstQuestion(data);
          });
        }
        if(answer===tempCard.correctAnswer){//8. VERIFICAR SI PREGUNTA ANTERIOR ES CORRECTA
          return[{
            difficult:tempCard.difficulty,
            correctAnswer: true,
            lastQuestion:false},
            this.card];
             //9. Enviar respuesta
        }
        else{
          return[{
            difficult:tempCard.difficulty,
            correctAnswer: false,
            lastQuestion:false},
            this.card];
        }
      }
      else{
        if(answer===tempCard.correctAnswer){//8. VERIFICAR SI PREGUNTA ANTERIOR ES CORRECTA
          return[{
            difficult:tempCard.difficulty,
            correctAnswer: true,
            lastQuestion:true},
            this.card];
        }
        else{
          return[{
            difficult:tempCard.difficulty,
            correctAnswer: false,
            lastQuestion:true},
            this.card];
        }
      }
    }
  }
}
