import { Injectable } from '@angular/core';
import { Results } from '../models/search-transaction';

// 👉 State shape
export interface RulesDetailState {
  item: Results | null;
}

// 👉 Store service
@Injectable({ providedIn: 'root' })
export class RulesDetailStore {
  private state: RulesDetailState = { item: null };

  setItem(item: Results) {
    this.state = { ...this.state, item };
  }

  getItem(): Results | null {
    return this.state.item;
  }
}
