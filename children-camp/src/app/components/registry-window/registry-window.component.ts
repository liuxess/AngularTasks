import { Component, OnInit } from '@angular/core';
import { RegisteredCamp, RegistrationService } from 'src/app/services/registration.service';


@Component({
  selector: 'app-registry-window',
  templateUrl: './registry-window.component.html',
  styleUrls: ['./registry-window.component.css']
})
export class RegistryWindowComponent implements OnInit {
  registryList: RegisteredCamp[] = [];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit() {
    this.loadRegistryEntries();
  }

  loadRegistryEntries() {
    this.registrationService.getAll()
      .then(entries => {this.registryList = entries, console.log(entries);})
      .catch(error => {
        console.log(error);
        // Handle errors
      });
  }
}