import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HallPage } from '../hall/hall.page';
import { PlayPage } from '../play/play.page';

import { GameOverPage } from './game-over.page';

const routes: Routes = [
  {
    path: '',
    component: GameOverPage
  },
  {
    path:'play/:modo',
    component: PlayPage
  },
  {
    path:'hall',
    component: HallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameOverPageRoutingModule {}
