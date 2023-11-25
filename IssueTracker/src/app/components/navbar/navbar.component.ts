import { Component } from '@angular/core';
import { TaskModalService } from 'src/app/services/task-modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private modalService: TaskModalService) {}

  toggleModal() {
    this.modalService.toggleModal();
  }
}
