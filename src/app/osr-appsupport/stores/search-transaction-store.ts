import { computed, Injectable, signal } from '@angular/core';
import { SearchTransactionService } from '../services/search-transaction.service';
import {
  RequestSearchTransaction,
  ResponseSearchTransaction,
} from '../models/search-transaction';

@Injectable()
export class SearchTransactionStore {
  //Signals
  private requestSignal = signal<RequestSearchTransaction | null>(null);
  private responseSignal = signal<ResponseSearchTransaction | null>(null);

  // Expose as read-only
  readonly requestSearchTxn = computed(() => this.requestSignal);
  readonly responseSearchTxn = computed(() => this.responseSignal);

  //set method for request , response model
  public setRequestSearchTxn(requestSearchTxn: RequestSearchTransaction) {
    this.requestSignal.set(requestSearchTxn);
  }

  public setResponseSearchTxn(responseSearchTxn: ResponseSearchTransaction) {
    this.responseSignal.set(responseSearchTxn);
  }

  public clear(): void {
    this.requestSignal.set(null);
    this.responseSignal.set(null);
  }
}
