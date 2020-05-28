import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor() {
  }
 
  @HostListener('keydown', ['$event']) onkeyDown(event) {
    let regex = /[^0-9]/g;
    let match = event.key.match(regex);
    let kc = event.keyCode;
    if (match !== null && (kc !== 37 && kc !== 39 && kc !== 8 && kc !== 9)) {
      event.preventDefault();
    }
  } 

}
