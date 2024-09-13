import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idFilter'
})
export class IdFilterPipe implements PipeTransform {

  transform(items: any[], searchId: string): any[] {
    if (!items || !searchId) {
      return items;
    }
    return items.filter(item => item.id.toString().includes(searchId));
  }

}
