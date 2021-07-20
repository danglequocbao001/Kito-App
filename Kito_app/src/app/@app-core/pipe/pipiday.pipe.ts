import { Pipe, PipeTransform } from '@angular/core';
import { isNull, isUndefined } from 'util';
import { Day } from '../http/calendar/calendar.DTO';

@Pipe({
    name: 'dayPipe'
})

export class DayPipe implements PipeTransform {
    transform(value: any, arrWeekend: Day[]): string {
        if (isNull(value) || isUndefined(value) || value === '') {
            return 'unknown';
        } else {
            const index = arrWeekend.findIndex(x => x.value.toString() === value.toString());
            return arrWeekend[index].valueView;
        }
    }
}
