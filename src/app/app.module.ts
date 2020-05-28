import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainRouterModule } from './libs/router/main-router/main-router.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SharedDirectivesModule } from './libs/directives/shared-directives/shared-directives.module';
import { SharedPipesModule } from "./libs/pipes/shared-pipes/shared-pipes.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedPipesModule,
    BrowserModule,
    SharedDirectivesModule,
    MainRouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
