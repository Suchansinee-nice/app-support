import { Injectable } from '@angular/core';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DatePickerAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (typeof value === 'string') {
      const date = value.split(this.DELIMITER);
      if (date.length === 3) {
        return {
          day: parseInt(date[0], 10),
          month: parseInt(date[1], 10),
          year: parseInt(date[2], 10),
        };
      }
    }
    return null;
    // if (value) {
    //   const date = value.split(this.DELIMITER);
    //   return {
    //     day: parseInt(date[0], 10),
    //     month: parseInt(date[1], 10),
    //     year: parseInt(date[2], 10),
    //   };
    // }
    // return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? ('0' + date.day).slice(-2) +
          this.DELIMITER +
          ('0' + date.month).slice(-2) +
          this.DELIMITER +
          date.year
      : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? ('0' + date.day).slice(-2) +
          this.DELIMITER +
          ('0' + date.month).slice(-2) +
          this.DELIMITER +
          date.year
      : '';
  }
}
