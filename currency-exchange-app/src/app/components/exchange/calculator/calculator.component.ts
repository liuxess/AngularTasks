import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { ExchangeRate, ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  baseCurrency: string = "";
  targetCurrency: string = "";
  exchangeRate: number | null = null;
  errorMessage: string | null = null;

  constructor(private exchangeService: ExchangeService, private errorService: ErrorService) {
    errorService.onErrorEvent().subscribe((error:string)=>{
      console.log("received error");
      this.errorMessage = error;
    })
  }

  onBaseCurrencyChange(newCurrency: string): void {
    this.baseCurrency = newCurrency;
    this.updateExchangeRate();
  }

  onTargetCurrencyChange(newCurrency: string): void {
    this.targetCurrency = newCurrency;
    this.updateExchangeRate();
  }

  private updateExchangeRate(): void {
    if (this.baseCurrency && this.targetCurrency) {
      this.exchangeService.getExchangeRate(this.baseCurrency, this.targetCurrency).subscribe({
        next: (exchange: ExchangeRate) => {
          this.exchangeRate = exchange.rate;
        },
        error: (error: any) => {
          this.errorMessage = 'Error fetching exchange rate: ' + error;
          this.exchangeRate = null;
        }
      });
    }
  }
}