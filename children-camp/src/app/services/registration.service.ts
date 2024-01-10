import { Injectable } from '@angular/core';
import { RegistryController } from './controllers/registry-controller.service';
import { ValidationService } from './validation-service.service';
export interface CampRegistry{
  firstName: string,
  lastName: string,
  dateOfBirth: number,
  email: string,
  phone: string,
  grade: number
}

export interface RegisteredCamp extends CampRegistry {
  id: string,
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(
    private registryController: RegistryController,
    private validationService: ValidationService
  ) {}

  public register(newRegistry: CampRegistry): Promise<void>{
    this.validateRegistry(newRegistry);
    
    return this.registryController.createRegistryEntry({id: crypto.randomUUID(), ...newRegistry})
  }

  public getAll(): Promise<RegisteredCamp[]> {
    return this.registryController.getAllRegistryEntries();
  }

  public update(registry: RegisteredCamp): Promise<void>{
    this.validateRegistry(registry);

    return this.registryController.updateRegistryEntry(registry);
  }

 public delete(id: string){
    
    return this.registryController.deleteRegistryEntry(id)
  }

  private validateRegistry(campRegistry: CampRegistry){
    this.validationService.validateName(campRegistry.firstName)
      && this.validationService.validateName(campRegistry.lastName)
      && this.validationService.validateDateOfBirth(campRegistry.dateOfBirth)
      && this.validationService.validateEmail(campRegistry.email)
      && this.validationService.validatePhone(campRegistry.phone)
      && this.validationService.validateGrade(campRegistry.grade)
  }
}
