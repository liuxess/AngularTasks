import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskPriority } from 'src/app/models/issues/issue';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class TaskSelectorComponent {
  taskPriorities = Object.values(TaskPriority).filter(task => typeof task == 'string');
  @Output() selectedPriorityChange = new EventEmitter<TaskPriority>();
  @Input() selectedPriority: TaskPriority;

  constructor() {
    this.selectedPriority = TaskPriority.NONE
  }

  onSelectionChange(selected: TaskPriority): void {
    this.selectedPriority = selected;
    console.log(selected);
    this.selectedPriorityChange.emit(this.selectedPriority);
  }
}
