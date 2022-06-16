import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HallPage } from './hall.page';

const routes: Routes = [
  {
    path: '',
    component: HallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HallPageRoutingModule {}
