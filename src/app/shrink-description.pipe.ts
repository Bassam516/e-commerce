import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shrinkDescription',
  standalone: true
})
export class ShrinkDescriptionPipe implements PipeTransform {

  transform(description:string): string {
    return description.split(" ").slice(0, 5).join(" ");
  }

}
