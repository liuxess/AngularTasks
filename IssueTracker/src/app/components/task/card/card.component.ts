import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskIssue, TaskPriority } from 'src/app/models/issues/issue';
import { TaskModalService } from 'src/app/services/task-modal.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
    @Input() task: TaskIssue;
    @Output() deletedTaskEvent = new EventEmitter<number>();
    
    constructor(private modalService: TaskModalService) {
      this.task = {id: 0, task: "", priority: TaskPriority.NONE};
    }

    delete(){
      this.deletedTaskEvent.emit(this.task.id);
    }

    edit(){
      this.modalService.toggleModalEdit(this.task);
    }
}
