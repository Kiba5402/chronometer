import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayComponent } from './components/display/display.component';
import { ControlComponent } from './components/control/control.component';
import { MainComponent } from './components/main/main.component';
import { RouterCronoModule } from './libs/router/router.cronoModule';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedDirectivesModule } from '../../libs/directives/shared-directives/shared-directives.module';
import { SharedPipesModule } from "../../libs/pipes/shared-pipes/shared-pipes.module";
import { CronoServiceService } from './service/crono-service.service';

@NgModule({
  declarations: [
    DisplayComponent,
    ControlComponent,
    MainComponent
  ],
  imports: [
    SharedPipesModule,
    CommonModule,
    RouterCronoModule,
    ReactiveFormsModule,
    SharedDirectivesModule
  ],
  providers: [
    CronoServiceService
  ]
})
export class CronometroModule { }
