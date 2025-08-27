import { Component } from '@angular/core';
import { SearchTransactionService } from '../services/search-transaction.service';
import { SearchTransactionStore } from '../stores/search-transaction-store';

@Component({
  selector: 'app-rules-detail',
  standalone: false,
  templateUrl: './rules-detail.component.html',
  styleUrl: './rules-detail.component.css',
  providers: [SearchTransactionService, SearchTransactionStore],
})
export class RulesDetailComponent {
  // private services
  private readonly searchTransactionService: SearchTransactionService;

  //private stores
  private readonly searchTxnStore: SearchTransactionStore;

  //constructor declare public variable for use in template
  constructor(
    searchTransactionService: SearchTransactionService,
    searchTxnStore: SearchTransactionStore
  ) {
    this.searchTransactionService = searchTransactionService;
    this.searchTxnStore = searchTxnStore;
  }
}
