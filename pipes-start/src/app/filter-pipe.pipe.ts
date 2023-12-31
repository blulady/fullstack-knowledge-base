import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  pure: false,
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, filterString: string, propertyName: string): any {
    if (value.length === 0 || filterString == '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item[propertyName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
