import { Injectable } from '@angular/core';
import { FrankfurterService, StringDictionaryResponse } from '../api/externa;/frankfurter.service';
import { Observable, ReplaySubject, Subscription, map } from 'rxjs';
import { ErrorService } from './error.service';


export interface Currency {
  symbol: string,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencies = new ReplaySubject<Currency[]>;

  constructor(private apiService : FrankfurterService, private errorService: ErrorService) { 
    this.loadData();
  }

  getCurrencies(): Observable<Currency[]> {
    return this.currencies.asObservable();
  }

  private loadData(){
    this.apiService.getCurrencies()
    .pipe(map(resp => this.convertToStringDictionaryResponseToArray(resp)))
    .subscribe({
      next: (currencies: Currency[]) => {
        this.currencies.next(currencies);
      },
      error: (error: any) => {
        this.errorService.sendError('Error fetching exchange rate: ' + JSON.stringify(error));
      }
    });

  }

  private convertToStringDictionaryResponseToArray(StringDictionaryResponse: StringDictionaryResponse): Currency[] {
    return Object.keys(StringDictionaryResponse).map(key => ({
      symbol: key,
      name: StringDictionaryResponse[key]
    }));
  }
}
