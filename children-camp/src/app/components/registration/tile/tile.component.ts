import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampRegistry, RegisteredCamp, RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent {
  @Input() registryData: RegisteredCamp | null = null;
  registryForm: FormGroup;
  isEditMode: boolean = true;
  @Output() refreshRequested = new EventEmitter<void>();
  globalError: string | null = null;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {
    this.registryForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      dateOfBirth: ['2012',[Validators.required, Validators.min(2005), Validators.max(2019)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['+370', [Validators.required, Validators.pattern(/^\+370\d{8,10}$/)]],
      grade: ['5', [Validators.required, Validators.min(5), Validators.max(12)]]
    });
  }

  ngOnInit() {
    if (this.registryData) {
      this.registryForm.patchValue(this.registryData);
      this.isEditMode = false; // Start in view mode if data is provided
    }
  }

  toggleEditMode() {
    this.registryForm.reset();
    this.isEditMode = !this.isEditMode;
  }

  delete(){
    this.registrationService.delete(this.registryData!.id)
    .then(() => {this.refreshRequested.emit()})
    .catch(error => {
      console.error(error);
      this.globalError = error;
    });
    
  }

  onSubmit() {
    if (this.registryForm.valid) {
      this.registerOrUpdate().then(() => {
        this.clear();
        this.refreshRequested.emit()
      }).catch(error => {
        console.error(error);
        this.globalError = error;
      });
    }
  }

  private clear(){
    this.registryForm.reset();
  }

  private registerOrUpdate() : Promise<void>{
      if(this.registryData){
        return this.registrationService.update(this.registryForm.value);
      }

      return this.registrationService.register(this.registryForm.value);
  }
}
