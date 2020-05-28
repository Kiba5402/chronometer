import { NgModule } from '@angular/core';
import { OnlyNumbersDirective } from '../directives/only-numbers.directive';
import { AddZeroDirective } from "../directives/add-zero.directive";

@NgModule({
  declarations: [
    OnlyNumbersDirective,
    AddZeroDirective
  ],
  exports: [
    OnlyNumbersDirective,
    AddZeroDirective
  ]
})
export class SharedDirectivesModule { }
