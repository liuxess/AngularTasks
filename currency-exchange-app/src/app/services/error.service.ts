import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorEmmitter = new EventEmitter<string>();

  constructor() { }

  onErrorEvent() {
    return this.errorEmmitter;
  }

  sendError(error: string){
    console.error(error);
    this.errorEmmitter.emit(error);
  }
}
