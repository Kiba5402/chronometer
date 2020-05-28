import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAddZeroInput]'
})
export class AddZeroDirective {

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('blur') onKeyup() {
    let val = this.el.nativeElement.value;
    if (val < 10 && val.trim() !== '') {
      this.el.nativeElement.value = '0' + val;
    }
  }

}
