import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

// Custom Date Formatter for dd/mm/yyyy
@Injectable()
export class ThaiDateParserFormatter extends NgbDateParserFormatter {

  parse(value: string): { year: number, month: number, day: number } | null {
    if (!value) return null;

    const parts = value.split('/').map(part => parseInt(part, 10));
    if (parts.length === 3) {
      return { day: parts[0], month: parts[1], year: parts[2]-543};
    }
    return null;
  }

  format(date: { year: number, month: number, day: number }): string {
    if (!date) return '';

    const day = date.day.toString().padStart(2, '0');
    const month = date.month.toString().padStart(2, '0');
    const year = (date.year+543).toString();
    return `${day}/${month}/${year}`;
  }
}