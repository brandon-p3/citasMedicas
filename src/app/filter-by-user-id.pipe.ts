import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByUserId'
})
export class FilterByUserIdPipe implements PipeTransform {

  transform(items: any[], userId: number | null): any[] {
    if (!items || userId === null) {
      return items;
    }
    return items.filter(item => item.usuario_id === userId);
  }

}
