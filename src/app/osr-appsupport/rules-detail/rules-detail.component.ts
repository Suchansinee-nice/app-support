import { Component } from '@angular/core';
import { SearchTransactionService } from '../services/search-transaction.service';
import { SearchTransactionStore } from '../stores/search-transaction-store';
import { Results } from '../models/search-transaction';
import { Router } from '@angular/router';
import { RulesDetailStore } from '../stores/rule-detail-store';

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

  items: Results | null;
  ruleName: string[] = [];

  //constructor declare public variable for use in template
  constructor(
    searchTransactionService: SearchTransactionService,
    searchTxnStore: SearchTransactionStore,
    private rulesDetailStore: RulesDetailStore,
    private router: Router
  ) {
    this.searchTransactionService = searchTransactionService;
    this.searchTxnStore = searchTxnStore;
    this.items = this.rulesDetailStore.getItem();
    console.log('item from store: ', this.items);
  }

  ngOnInit(): void {
    this.getRuleName();
  }

  getRuleName() {
    if (!this.items || !this.items.rules) return;

    this.ruleName = []; // reset

    for (let i = 0; i < this.items?.rules.length; i++) {
      let parts = this.items.rules[i].messageTH.substring(0, 7);
      if (!parts.includes('Rule')) {
        parts = '-';
      }
      this.ruleName.push(parts);
    }

    console.log('Rule Name Array:', this.ruleName);
  }

  goHome() {
    this.router.navigate(['/osr-appsupport']);
  }
}
