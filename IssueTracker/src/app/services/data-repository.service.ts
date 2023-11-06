import { Injectable } from '@angular/core';

export interface IStoreable<TValue>{
  key: string,
  value: TValue
}

@Injectable({
  providedIn: 'root'
})
export class DataRepositoryService {

  constructor() { }

  save<TValue>(storeable: IStoreable<TValue>){
    try {
      const serializedValue = JSON.stringify(storeable.value);
      localStorage.setItem(storeable.key, serializedValue);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  read<TValue>(key: string): TValue | null {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) as TValue : null;
    } catch (e) {
      console.error('Error reading from localStorage', e);
      return null;
    }
  }

  delete(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing item from localStorage', e);
    }
  }
}
