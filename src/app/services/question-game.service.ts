import { Injectable } from '@angular/core';
import { CardInfo } from '../interfaces/card-info';
import { Question } from '../interfaces/question';
import { QuestionsService } from './questions.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionGameService {
  card: Question;                                                  //LA CARTA QUE SE LEE
  data: any;                                                       //PREGUNTAS
  questionNumber: number;                                          //NUMERO DE PREGUNTAS CONTESTADAS
  range: string[]=['easy','medium','hard'];                        //RANGO DE DIFICULTAD
  mode: boolean;                                                   //MODO DE JUEGO RUSH=TRUE NORMAL=FALSE
  difficult: number;                                               //DIFICULTAD 0=EASY 1=MEDIUM 2=HARD
  questionNumberNormal: number | undefined;                        //NUMERO DE PREGUNTAS CONTESTADAS EN MODO NORMAL (LIM=10)
  final: boolean;                                                  //FINAL DEL JUEGO
  rigths: number;                                                  //ACIERTOS
  constructor(private questionService: QuestionsService){
  }


  //1.INICIA EL JUEGO

  gameOn(mode: boolean, data: any){
    this.mode=mode;
    this.difficult=0;
    this.rigths=0;
    this.questionNumberNormal= mode? undefined:0;
    this.card=this.firstQuestion(data);
    this.final=false;
  return this.card;

  }

  firstQuestion(data: any, cambio?: boolean){ //3. SE COPIAN LAS PREGUNTAS OBTENIDAS
    this.data=data;
    this.questionNumber=0;
    if(cambio && typeof cambio !== undefined) {this.questionNumberNormal++;}
    return {
      difficulty:this.data[0].difficulty,
      question: this.data[0].question,
      correctAnswer:this.data[0].correct_answer,
      incorrectsAnswers:this.data[0].incorrect_answers,
      shuffleAnswers:this.shuffle(this.data[0].incorrect_answers, this.data[0].correct_answer)
    };
  }

  correctAnswers(answer: string ,card: Question){// 2. SE COMPRUEBA LA RESPUESTA
    if(this.mode){                               // SE RETORNA UN OBJETO DEL TIPO CARDINFO
      if(card.correctAnswer===answer){
        return[{
          difficult:card.difficulty,
          correctAnswer: true,
          lastQuestion:false
          }, ++this.rigths];
      }
      else{
        return[{
          difficult:card.difficulty,
          correctAnswer: false,
          lastQuestion:true
          }, 0];
      }
    }
    else{
      if(card.correctAnswer===answer){
        return[{
          difficult:card.difficulty,
          correctAnswer: true,
          lastQuestion:this.final
          }, ++this.rigths];
      }
      else{
        return[{
          difficult:card.difficulty,
          correctAnswer: false,
          lastQuestion:this.final
          }, 0];
      }
    }
  }

  nextQuestion(difficult: number, card: Question){ //4 Y 5. SE RESPONDE LA PREGUNTA Y
    this.questionNumber++;                                         //SE AUMENTA EN 1 EL NUMERO DE RESPONDIDAS
    if(this.mode){
      if(this.questionNumber<10){ //6. SE CAMBIA A LA SIGUIENTE PREGUNTA SI DIFICULTA ES LA MISMA Y AUN QUEDAN EN FILA
          this.card={
            difficulty:this.data[this.questionNumber].difficulty,
            question: this.data[this.questionNumber].question,
            correctAnswer:this.data[this.questionNumber].correct_answer,
            incorrectsAnswers:this.data[this.questionNumber].incorrect_answers,
            shuffleAnswers:this.shuffle(this.data[this.questionNumber].incorrect_answers, this.data[this.questionNumber].correct_answer)
            };
         }
      else{
        this.questionService.getRushQuestions(this.range[difficult]).subscribe((data: any)=>{//6.5 NO QUEDAN PREGUNTAS EN FILA, IR A 3
          this.card=this.firstQuestion(data);
        });
      }
    }
    else{
      this.questionNumberNormal++;
      if(this.questionNumberNormal<10){ //6. SE CAMBIA A LA SIGUIENTE PREGUNTA SI DIFICULTA ES LA MISMA Y AUN QUEDAN EN FILA
          this.card={
            difficulty:this.data[this.questionNumber].difficulty,
            question: this.data[this.questionNumber].question,
            correctAnswer:this.data[this.questionNumber].correct_answer,
            incorrectsAnswers:this.data[this.questionNumber].incorrect_answers,
            shuffleAnswers:this.shuffle(this.data[this.questionNumber].incorrect_answers, this.data[this.questionNumber].correct_answer)
          };
          if(this.questionNumberNormal===9){this.final=true;}
      }
    }
    return this.card;
  }
  shuffle(array: string[], member?: string){
    if(typeof member !== 'undefined'){
      array.push(member);
    }
    for (let i = array.length -1; i >0; i--) {
      const j= Math.floor(Math.random()* (i+1));
      [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
  }
}
