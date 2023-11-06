import { Component } from '@angular/core';
import { TaskIssue, TaskPriority } from 'src/app/models/issues/issue';
import { TaskHandlingService } from 'src/app/services/issues/task-handling.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  taskList: TaskIssue[];

  constructor(private taskHandler: TaskHandlingService) {
    this.taskList = taskHandler.fetchTasks();
    if(this.taskList.length === 0){
      taskHandler.createTask("Example task", TaskPriority.ROUTINE);
      taskHandler.createTask("Another task", TaskPriority.URGENT);
      this.refresh();
    }
  }

  refresh():void{
    this.taskList = this.taskHandler.fetchTasks();
  }

  addNewTask(taskIssue: TaskIssue): void{
    this.taskHandler.createTask(taskIssue.task, taskIssue.priority);
    this.refresh();
  }

  delete(id: number): void{
    this.taskHandler.delete(id);
    this.refresh();
  }

}
