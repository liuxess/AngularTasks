import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

   validateName(name: string): boolean {
    const regex = /^[A-Za-z]+$/;
    var valid = regex.test(name) && name.length >= 3 && name.length <= 15;
    if(valid) return true;

    throw new Error("Name is invalid");
  }

   validateDateOfBirth(dateOfBirth: number): boolean {
    const fiveYearsAgo = Date.now() - (5 * 365 * 24 * 60 * 60 * 1000);
    var valid =  dateOfBirth < fiveYearsAgo;
    if(valid) return true;

    throw new Error("Name is invalid");
  }

   validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var valid =  regex.test(email);
    if(valid) return true;

    throw new Error("Name is invalid");
  }

   validatePhone(phone: string): boolean {
    const regex = /^\+370\d{8,10}$/;
    var valid =  regex.test(phone);
    if(valid) return true;

    throw new Error("Name is invalid");
  }

   validateGrade(grade: number): boolean {
    var valid =  grade >= 5 && grade <= 12;
    if(valid) return true;

    throw new Error("Name is invalid");
  }
}