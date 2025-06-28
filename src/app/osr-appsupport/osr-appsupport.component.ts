import { Component, signal, Signal, WritableSignal } from '@angular/core';
import {
  RequestSearchTransaction,
  ResponseSearchTransaction,
  Results,
} from './models/search-transaction';
import { SearchTransactionService } from './services/search-transaction.service';
import { SearchTransactionStore } from './stores/search-transaction-store';
import { DatePipe } from '@angular/common';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-osr-appsupport',
  standalone: false,
  templateUrl: './osr-appsupport.component.html',
  styleUrl: './osr-appsupport.component.css',
  providers: [SearchTransactionService, SearchTransactionStore, DatePipe],
})
export class OsrAppsupportComponent {
  // private services
  private readonly searchTransactionService: SearchTransactionService;

  //private stores
  private readonly searchTxnStore: SearchTransactionStore;

  // public signal for use in this template
  // request!: Signal<RequestSearchTransaction | null>;
  response: WritableSignal<ResponseSearchTransaction> =
    signal<ResponseSearchTransaction>({
      response: [],
    });

  request: WritableSignal<RequestSearchTransaction> =
    signal<RequestSearchTransaction>({
      refNo: '',
      transactionId: '',
      createdDate: null,
    });

  //constructor declare public variable for use in template
  constructor(
    searchTransactionService: SearchTransactionService,
    searchTxnStore: SearchTransactionStore,
    private datePipe: DatePipe
  ) {
    this.searchTransactionService = searchTransactionService;
    this.searchTxnStore = searchTxnStore;
  }

  updateField(field: keyof RequestSearchTransaction, value: any): void {
    this.request.update((state) => ({ ...state, [field]: value }));
  }

  clear() {
    console.log('clear');
    this.request.set({
      refNo: null,
      transactionId: null,
      createdDate: null,
    });
    this.response.set({
      response: [],
    });
    this.searchTxnStore.clear();
  }

  convertDateToString(date: Date): string | null {
    return this.datePipe.transform(date, 'MM-dd-yyyy'); // example format: 2025-06-25
  }

  parseDDMMYYYY(dateStr: string): DateTime | null {
    if (!dateStr) {
      return null;
    }
    const [day, month, year] = dateStr.split('-').map(Number);
    if (!day || !month || !year) {
      return null;
    }

    const date = DateTime.fromObject(
      { year: year, month: month, day: day },
      {
        zone: 'Asia/Bangkok',
      }
    );

    return date;
  }

  search() {
    if (
      this.request().refNo &&
      this.request().transactionId &&
      this.request().createdDate
    ) {
      const dateStr = this.request().createdDate?.toString();
      const parts = dateStr!.split('/');
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];

      const newFormat1 = `${day}-${month}-${year}`; //dd-MM-yyyy not use datepipe

      const newFormat2 = `${year}-${month}-${day}`;
      this.request().createdDate = new Date(newFormat2);

      // const date = this.convertDateToString(this.request().createdDate!);
      // console.log(date); //dd-MM-yyyy use datepipe

      const parsed = this.parseDDMMYYYY(newFormat1!); //convert to Date

      const formatted = this.datePipe.transform(
        parsed?.toJSDate(),
        'dd-MMM-yy'
      ); //format to 25-Jun-25

      this.request().date = formatted?.toUpperCase();
      console.log('newFormat2', this.request().date);
      this.searchTxnStore.setRequestSearchTxn(this.request());

      //call service
      this.searchTransactionService
        .getSearchTxnInfo(this.request())
        .subscribe((res: ResponseSearchTransaction) => {
          this.searchTxnStore.setResponseSearchTxn(res); //set store
          if (res.response != null) {
            this.response.set({
              response: res.response, //set repsonse
            });
            console.log('response', this.response()?.response);
          } else {
            if (!this.response().response) {
              this.response().response = [];
            }
          }
        });
    }
  }
}
