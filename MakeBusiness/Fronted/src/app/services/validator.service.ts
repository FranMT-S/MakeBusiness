import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public emailPattern:string = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9+_.-]+\\.[A-Za-z]+$";
  public isInt:string = "^[0-9]+$"

  constructor() { }

  notBlank(control:FormControl): ValidationErrors | null{
    const value: string = control.value?.trim().toLowerCase();

    if(value === "")
       return {
        isBlank: true
       }
       return null;
  }

  isNumber(control:FormControl): ValidationErrors | null{
    const value: string = control.value;
    let number = Number(value)

    if(Number.isNaN(number))
       return {
        isNumber: false
       }
      return null;
  }

  isInteger(control:FormControl): ValidationErrors | null{
    const value: string = control.value;
  
    let match = (/^[0-9]+$/).test(value)
  
    let number = Number(value)

    if(Number.isNaN(number) ||  !match )
       return {
        isInteger: false
       }
      return null;
  }

}
