import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import {
  RequestSearchTransaction,
  ResponseSearchTransaction,
} from '../models/search-transaction';
import { Observable } from 'rxjs';

@Injectable()
export class SearchTransactionService {
  private http: HttpClient;
  private url = environment.apiUrl;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  //get method
  getSearchTxnInfo(
    requestSearchTxn: RequestSearchTransaction
  ): Observable<ResponseSearchTransaction> {
    return this.http.post<ResponseSearchTransaction>(
      `${this.url}/api/searchTransaction`,
      requestSearchTxn
    );
  }
}
