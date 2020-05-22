import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CronometroModule } from '../../../modules/cronometro/cronometro.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: '../../../modules/cronometro/cronometro.module#CronometroModule'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRouterModule { }
