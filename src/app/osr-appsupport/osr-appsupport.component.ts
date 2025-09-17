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
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RulesDetailStore } from './stores/rule-detail-store';

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
  showError: boolean = false;

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
      idCard: '',
    });

  createdDate: string = '';

  //constructor declare public variable for use in template
  constructor(
    searchTransactionService: SearchTransactionService,
    searchTxnStore: SearchTransactionStore,
    private datePipe: DatePipe,
    private router: Router,
    private rulesDetailStore: RulesDetailStore
  ) {
    this.searchTransactionService = searchTransactionService;
    this.searchTxnStore = searchTxnStore;
  }

  ngOnInit() {
    const responseData = sessionStorage.getItem('responseData');
    const refNo = sessionStorage.getItem('refNo');
    const transactionId = sessionStorage.getItem('transactionId');
    const date = sessionStorage.getItem('createdDate');
    const idCard = sessionStorage.getItem('idCard');

    if (responseData) {
      sessionStorage.clear();
      const jsonObject = JSON.parse(responseData);
      this.response.set(jsonObject);
      this.request.set({
        refNo: refNo,
        transactionId: transactionId,
        createdDate: date ? new Date(date) : null,
        idCard: idCard,
      });

      if (date) {
        const parsed = new Date(date);
        if (!isNaN(parsed.getTime())) {
          this.createdDate = parsed.toISOString().split('T')[0];
        }
      }
    }
  }

  updateField(field: keyof RequestSearchTransaction, value: any): void {
    if (field == 'createdDate') {
      this.showError = false;
    }

    this.request.update((state) => ({ ...state, [field]: value }));
  }

  clear() {
    this.showError = false;
    this.createdDate = '';
    this.request.set({
      refNo: null,
      transactionId: null,
      createdDate: null,
      idCard: null,
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
      // this.request().refNo &&
      // this.request().transactionId &&
      this.request().createdDate &&
      this.createdDate
    ) {
      this.showError = false;
      const dateStr = this.createdDate?.toString(); //use create date, if use request.createDate format is Mon 23 June is incorrect to split
      const parts = dateStr!.split('-');
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      const date = `${day}-${month}-${year}`; //dd-MM-yyyy not use datepipe

      const createdDate = `${year}-${month}-${day}`;
      this.request().createdDate = new Date(createdDate); //keep

      // const date = this.convertDateToString(this.request().createdDate!);
      // console.log(date); //dd-MM-yyyy use datepipe

      const dateString = this.parseDDMMYYYY(date!); //convert to Date
      const dateFormatted = this.datePipe.transform(
        dateString?.toJSDate(),
        'dd-MMM-yy'
      ); //format to 25-Jun-25

      this.request().date = dateFormatted?.toUpperCase(); //for query
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
    } else {
      this.showError = true;
      return;
    }
  }

  route(item: Results) {
    const response = this.response();
    sessionStorage.setItem('responseData', JSON.stringify(response));

    const request = this.request?.(); // Use optional chaining
    const refNo = request?.refNo?.toString();
    const transactionId = request?.transactionId?.toString();
    const idCard = request?.idCard?.toString();

    if (refNo) {
      sessionStorage.setItem('refNo', refNo);
    }

    if (transactionId) {
      sessionStorage.setItem('transactionId', transactionId);
    }

    if (idCard) {
      sessionStorage.setItem('idCard', idCard);
    }

    if (request?.createdDate) {
      this.createdDate = request.createdDate.toISOString();
      sessionStorage.setItem('createdDate', this.createdDate);
      console.log('sss', this.createdDate);
    }

    this.rulesDetailStore.setItem(item);
    this.router.navigate(['/rules-detail']);
  }
}
