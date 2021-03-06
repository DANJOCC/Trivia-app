import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'hall',
    loadChildren: () => import('./pages/hall/hall.module').then( m => m.HallPageModule)
  },
  {
    path: 'hall/:user',
    loadChildren: () => import('./pages/hall/hall.module').then( m => m.HallPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'play/:modo/:user',
    loadChildren: () => import('./pages/play/play.module').then( m => m.PlayPageModule)
  },
  {
    path: 'question-card',
    loadChildren: () => import('./pages/question-card/question-card.module').then( m => m.QuestionCardPageModule)
  },
  {
    path: 'game-over/:modo/:score/:user',
    loadChildren: () => import('./pages/game-over/game-over.module').then( m => m.GameOverPageModule)
  },

  /*{
    path: 'ranking',
    loadChildren: () => import('./pages/ranking/ranking.module').then( m => m.RankingPageModule)
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
