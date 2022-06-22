import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameOverPage } from '../game-over/game-over.page';

import { PlayPage } from './play.page';

const routes: Routes = [
  {
    path: '',
    component: PlayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayPageRoutingModule {}
