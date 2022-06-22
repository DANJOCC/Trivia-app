import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HallPageRoutingModule } from './hall-routing.module';

import { HallPage } from './hall.page';
import { RankingPage } from '../ranking/ranking.page';
import { RankingPageModule } from '../ranking/ranking.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HallPageRoutingModule,
    RankingPageModule
  ],
  declarations: [HallPage, RankingPage]
})
export class HallPageModule {}
