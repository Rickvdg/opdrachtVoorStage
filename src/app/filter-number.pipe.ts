import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNumber'
})
export class FilterNumberPipe implements PipeTransform {

  transform(items: any[], field: string, value: number): any[] {

    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }

    if (field == 'Alcoholpercentage') {
      return items.filter(singleItem => Number.parseFloat(singleItem[field].replace(',', '.').slice(0, -1)) <= value);
    }
    return  items.filter(singleItem => Number.parseFloat(singleItem[field]) >= value);
  }

}
