import { Injectable } from '@angular/core';
import { FrankfurterService } from '../api/externa;/frankfurter.service';
import { Observable, ReplaySubject, map } from 'rxjs';
import { ErrorService } from './error.service';

export interface ExchangeRate{
  base: string,
  target: string,
  rate: number,
}

interface AwaitingExchangeRate{
  base: string,
  target: string,
  rate: ReplaySubject<number>
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
   private cachedRates: AwaitingExchangeRate[] = [];

  constructor(private apiService: FrankfurterService, private errorService: ErrorService) { 
  }

  getExchangeRate(baseSymbol: string, targetSymbol: string) : Observable<ExchangeRate>{
    let currentRate: AwaitingExchangeRate;
    let cachedIndex = this.cachedRates.findIndex(cache => cache.base == baseSymbol && cache.target == targetSymbol);
    if(cachedIndex < 0){
      currentRate = {
        base: baseSymbol,
        target: targetSymbol,
        rate: new ReplaySubject()
      };
      this.cachedRates.push(currentRate);

      if(baseSymbol == targetSymbol){
        currentRate.rate.next(1);
      }
      else
        this.apiService.getExchangeRate(baseSymbol, targetSymbol).subscribe({
          next: (rate) => {
            console.log(rate);
            currentRate.rate.next(rate);
          },
          error: (error: any) => {
            this.errorService.sendError('Error fetching exchange rate: ' + JSON.stringify(error));
          }
        }
      )

    }
    else{
      currentRate = this.cachedRates[cachedIndex];
    }

    return currentRate.rate.asObservable().pipe(map(rate => {return {base: baseSymbol, target: targetSymbol, rate: rate}}))
  }
}
