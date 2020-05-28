import { NgModule } from '@angular/core';
import { AddZeroPipe } from '../addZero/add-zero.pipe';

@NgModule({
  declarations: [
    AddZeroPipe
  ],
  exports: [
    AddZeroPipe
  ]
})
export class SharedPipesModule { }
