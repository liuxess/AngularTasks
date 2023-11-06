import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskIssue, TaskPriority } from 'src/app/models/issues/issue';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
    @Input() task: TaskIssue;
    @Output() deletedTaskEvent = new EventEmitter<number>();
    
    constructor() {
      this.task = {id: 0, task: "", priority: TaskPriority.NONE};
    }

    delete(){
      this.deletedTaskEvent.emit(this.task.id);
    }
}
