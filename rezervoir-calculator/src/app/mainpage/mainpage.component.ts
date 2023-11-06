import { Component } from '@angular/core';
import { FullnessCalculatorService, IFillingParameters, IVolumeCalculationResult, Inputs } from '../services/calculators/fullness-calculator.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent {
  inputs: IFillingParameters;

  fillResult: number | null;

  calculationErrors: {
    volumeError: string | null;
    speedError: string | null;
    timeError: string | null;
  };

  constructor(private fulnessCalculator: FullnessCalculatorService) { 
    this.inputs = {
      totalVolume: 0,
      fillingSpeed: 0,
      fillingTime: 0,
    }
    this.fillResult = null;
    this.calculationErrors ={
      volumeError: null,
      speedError:  null,
      timeError: null
    }
  }

  onSubmit(): void {
    let calculationResult = this.fulnessCalculator.calculateFilledVolumePercentage(this.inputs);
    console.log(calculationResult);
    if(typeof calculationResult.result === 'number'){
      this.fillResult = calculationResult.result;
      this.calculationErrors ={
        volumeError: null,
        speedError:  null,
        timeError: null
      }
    }
    else{
      this.fillResult = null;
      calculationResult.result.forEach(
        element => {
          switch(element.parameter){
            case Inputs.VOLUME:
              this.calculationErrors.volumeError = element.problem;
              break;
            case Inputs.SPEED:
              this.calculationErrors.speedError = element.problem;
              break;
            case Inputs.TIME:
              this.calculationErrors.timeError = element.problem;
              break;
          }
      })
    }
    
  }
}
