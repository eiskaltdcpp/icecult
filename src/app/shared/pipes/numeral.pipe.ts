import { Pipe, PipeTransform } from '@angular/core';
import * as numeral from 'numeral';

@Pipe({
  name: 'iceNumeral'
})
export class NumeralPipe implements PipeTransform {
  transform(value: any, format: string): any {
    return numeral(value).format(format);
  }
}
