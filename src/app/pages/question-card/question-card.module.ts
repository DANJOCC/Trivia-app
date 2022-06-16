import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionCardPageRoutingModule } from './question-card-routing.module';

import { QuestionCardPage } from './question-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionCardPageRoutingModule
  ],
  declarations: [QuestionCardPage]
})
export class QuestionCardPageModule {}
