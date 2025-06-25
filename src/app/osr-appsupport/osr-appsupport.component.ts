import { Component, Signal } from '@angular/core';
import { RequestSearchTransaction } from './models/search-transaction';
import { SearchTransactionService } from './services/search-transaction.service';
import { SearchTransactionStore } from './stores/search-transaction-store';

@Component({
  selector: 'app-osr-appsupport',
  standalone: false,
  templateUrl: './osr-appsupport.component.html',
  styleUrl: './osr-appsupport.component.css',
  providers: [SearchTransactionService],
})
export class OsrAppsupportComponent {
  // private services
  private readonly searchTransactionService!: SearchTransactionService;

  //private stores
  private readonly searchTxnStore!: SearchTransactionStore;

  // public signal for use in this template
  request!: Signal<RequestSearchTransaction | null>;

  //constructor declare public variable for use in template
  constructor(
    searchTransactionService: SearchTransactionService,
    searchTxnStore: SearchTransactionStore
  ) {
    this.searchTransactionService = searchTransactionService;
    this.searchTxnStore = searchTxnStore;
  }

  clear() {}

  search() {}

  mockData = [
    { transactionId: 'txn_11111111', createdDate: '01/05/2568' },
    { transactionId: 'txn_11111112', createdDate: '02/05/2568' },
    { transactionId: 'txn_11111113', createdDate: '03/05/2568' },
    { transactionId: 'txn_11111114', createdDate: '04/05/2568' },
    { transactionId: 'txn_11111115', createdDate: '05/05/2568' },
  ];
}
