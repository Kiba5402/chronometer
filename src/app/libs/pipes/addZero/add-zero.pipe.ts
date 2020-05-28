import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZero'
})
export class AddZeroPipe implements PipeTransform {

  transform(value: number): unknown {
    return (value < 10) ? "0" + value : value;
  }

}
