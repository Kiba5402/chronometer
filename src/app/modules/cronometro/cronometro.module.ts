import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './components/display/display.component';
import { ControlComponent } from './components/control/control.component';
import { MainComponent } from './components/main/main.component';
import { RouterCronoModule } from './libs/router/router.cronoModule';

@NgModule({
  declarations: [DisplayComponent, ControlComponent, MainComponent],
  imports: [
    CommonModule,
    RouterCronoModule
  ]
})
export class CronometroModule { }
