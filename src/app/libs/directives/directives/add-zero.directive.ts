import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAddZeroInput]'
})
export class AddZeroDirective implements OnInit {

  @Input() private appAddZeroInput: boolean;

  constructor(
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    if (this.appAddZeroInput) {
      this.el.nativeElement.style.textAlign = "center";
    }
  }

  @HostListener('blur') onKeyup() {
    let val = this.el.nativeElement.value;
    if (Number.parseInt(val) < 10 && val.trim() !== '') {
      this.el.nativeElement.value = '0' + Number.parseInt(val);
    }
  }

}
