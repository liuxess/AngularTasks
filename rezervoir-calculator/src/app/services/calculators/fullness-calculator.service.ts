import { Injectable } from '@angular/core';

export enum Inputs {
  VOLUME,
  SPEED,
  TIME
}

export interface IFillingParameters{
  totalVolume: number;
  fillingSpeed: number;
  fillingTime: number;
}

export interface IValidationError{
  parameter: Inputs;
  problem: string;
}

export interface IVolumeCalculationResult{
  success: boolean;
  result: number | IValidationError[];
}


@Injectable({
  providedIn: 'root'
})
export class FullnessCalculatorService {

  constructor() { }

  calculateFilledVolumePercentage(fillingParameters: IFillingParameters) : IVolumeCalculationResult {
     let error : IValidationError[] = [];

     if (!this.validatePositive(fillingParameters.totalVolume)) {
      error.push({parameter: Inputs.VOLUME, problem: "Total volume is required and must be a positive number."});
    }

    if (!this.validatePositive(fillingParameters.fillingSpeed)) {
      error.push({parameter: Inputs.SPEED, problem: "Filling speed is required and must be a non-negative number."});
    }

    if (!this.validatePositive(fillingParameters.fillingTime)) {
      error.push({parameter: Inputs.TIME, problem: "Filling time is required and must be a non-negative number."});
    }

     if(error.length > 0){
      return {success: false, result: error};
     }
    
     let percentage = this.calculatePercentageFilled(fillingParameters);

    if(this.validateRange(percentage, 0, 100)){
      return {success: true, result: percentage };
    }

    error.push({parameter: Inputs.TIME, problem: "The reservoir will be overfilled by filling so long."});
    return {success: false, result: error};
  }

  private validatePositive(value: number): boolean {
    return value > 0;
  }

  private validateRange(value: number, min: number, max: number): boolean{
    return value > min && value <= max;
  }

  private calculatePercentageFilled({totalVolume, fillingSpeed, fillingTime}: IFillingParameters): number{
    return  100 * fillingSpeed * fillingTime / totalVolume;
  }

}
