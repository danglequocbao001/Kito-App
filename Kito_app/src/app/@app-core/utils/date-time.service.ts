import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeService {
  public DAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  public VIETNAMESE_DAYS = [
    'CN',
    'Hai',
    'Ba',
    'Tư',
    'Năm',
    'Sáu',
    'Bảy',
  ];

  public VIETNAMESE_DAYS_2 = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
  ];

  public MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  public MONTHS_VIETNAMESE = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  constructor() { }

  // Thursday, 03 January 2021
  public getDateString(date: Date) {
    return `${this.DAYS[date.getDay()]}, ${date.getDate()} ${this.MONTHS[date.getMonth()]} ${date.getFullYear()}`;
  }

  // 2021-01-01
  public getDateString2(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  // Thursday, 03 January 2021
  public getDateString3(date: Date) {
    return `${this.VIETNAMESE_DAYS_2[date.getDay()]} - ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  }

  // 5:00
  public getTimeString(date: Date) {
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${date.getHours()}:${minutes}`;
  }

  public numberWithCommas(str) {
    let parts = str.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }

  public isEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  public daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
}
