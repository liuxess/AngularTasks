import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const baseFrankfurterDomain = 'https://api.frankfurter.app';

export interface StringDictionaryResponse {
  [key:string] : string;
}

export interface ExchangeRateResponse {
  rates: {
    [key:string] : number
  }
}

@Injectable({
  providedIn: 'root'
})
export class FrankfurterService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }
 
  private get<T>(route: string, params?: any): Observable<T> {
    return this.http.get<T>(baseFrankfurterDomain + route, { headers: this.headers, params });
  }

  getCurrencies(): Observable<StringDictionaryResponse> {
    return this.get("/currencies");
  }

  getExchangeRate(baseSymbol: string, targetSymbol: string) : Observable<number> {
    return this.get<ExchangeRateResponse>("/latest", {"from": baseSymbol, "to": targetSymbol}).pipe(map(resp => resp.rates[targetSymbol]));
  }
}
