import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZero'
})
export class AddZeroPipe implements PipeTransform {

  transform(value: any): unknown {
    if (String(value).trim() == "") {
      return "00";
    } else if (Number.parseInt(value) < 10) {
      return "0" + value;
    }else{
      return value;
    }
  }

}
