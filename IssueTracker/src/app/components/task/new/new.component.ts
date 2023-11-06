import { Component, EventEmitter, Output } from '@angular/core';
import { TaskIssue, TaskPriority } from 'src/app/models/issues/issue';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewTaskComponent {
    taskName: string;
    taskPriority: TaskPriority;
    @Output() taskCreatedEvent = new EventEmitter<TaskIssue>();

    constructor() {
      this.taskName = "";
      this.taskPriority = TaskPriority.NONE;
    }

    changePriority(priority: TaskPriority){
      console.log(priority);
      this.taskPriority = priority;
    }

    onSubmit(){
      let newTask: TaskIssue = {id: 0, task: this.taskName, priority: this.taskPriority};
      this.taskCreatedEvent.emit(newTask)
    }
}
