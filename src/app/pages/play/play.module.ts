import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayPageRoutingModule } from './play-routing.module';

import { PlayPage } from './play.page';
import { QuestionCardPage } from '../question-card/question-card.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayPageRoutingModule,
  ],
  declarations: [PlayPage,QuestionCardPage]
})
export class PlayPageModule {}
