import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'integer',
  standalone: true
})
export class IntegerPipe implements PipeTransform {

  transform(i:any): number {
    return parseInt(i);
  }

}
