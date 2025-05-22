import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

const MONTHS_LONG = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];
const MONTHS_SHORT = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

const WEEKDAYS_SHORT = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'];
const WEEKDAYS_LONG = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];

@Injectable()
export class ThaiDatepickerI18n extends NgbDatepickerI18n {
  override getWeekdayLabel(weekday: number, width?: 'long' | 'short' | 'narrow' | undefined): string {
    if (width == 'long') {
        return WEEKDAYS_LONG[weekday - 1];
    }

    return WEEKDAYS_SHORT[weekday-1];
  }
  override getDayAriaLabel(date: NgbDateStruct): string {
    return `วันที่ ${date.day} เดือน ${this.getMonthShortName(date.month)} ปี ${date.year}`;
  }

  getMonthShortName(month: number): string {
    return MONTHS_SHORT[month - 1];
  }

  getFirstDayOfWeek(): number {
    return 0; // วันอาทิตย์
  }

  getMonthFullName(month: number): string {
    return MONTHS_LONG[month - 1];
  }

  getWeekdayFullName(weekday: number): string {
    return WEEKDAYS_SHORT[weekday - 1];
  }

  override getYearNumerals(year: number): string {
    return (year + 543).toString();
  }
}