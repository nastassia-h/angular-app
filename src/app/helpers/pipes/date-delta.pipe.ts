import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateDelta',
  standalone: true
})
export class DateDeltaPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) return '';

    let createdAt = moment.utc(value);
    let now = moment();
    let diff = now.diff(createdAt);

    let seconds = Math.floor(moment.duration(diff).asSeconds())
    let minutes = Math.floor(moment.duration(diff).asMinutes());
    let hours = Math.floor(moment.duration(diff).asHours());
    let days = Math.floor(moment.duration(diff).asDays());
    let months = Math.floor(moment.duration(diff).asMonths());
    let years = Math.floor(moment.duration(diff).asYears());

    seconds = (Math.floor(seconds / 60) < 1) ? seconds : 0;
    minutes = (Math.floor(minutes / 60) < 1) ? minutes : 0;
    hours = (Math.floor(hours / 24) < 1) ? hours : 0;
    days = (Math.floor(days / 31) < 1) ? days : 0;
    months = (Math.floor(months / 12) < 1) ? months : 0;
    
    let message = '';
    message += (seconds > 0) ? seconds + ' sec' : '';
    message += (minutes > 0) ? minutes + ' min' : '';
    message += (hours > 0) ? hours + 'h' : '';
    message += (days > 0) ? days + ' days' : '';
    message += (months > 0) ? months + ' months' : '';
    message += (years > 0) ? years + ' years' : '';
  
    return message + ' ago'
  }
}
