import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency, CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  currencies: Currency[] = [];
  selectedCurrencySymbol = "";
  isLoading = true; 
  @Output() currencyChange = new EventEmitter<string>();
  @Input() name : string | null = null;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit() {
    this.currencyService.getCurrencies().subscribe({
      next: (currencyDict) => {
        this.currencies = currencyDict;
        this.selectedCurrencySymbol = this.currencies[0].symbol;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching currencies', error);
        this.isLoading = false;
      }
    });
  }

  onCurrencyChange(newCurrency: string) {
    this.selectedCurrencySymbol = newCurrency; 
    this.currencyChange.emit(this.selectedCurrencySymbol); // Emit the change to parent
  }
}