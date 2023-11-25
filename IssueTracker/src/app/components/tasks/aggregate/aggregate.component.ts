import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskPriority } from 'src/app/models/issues/issue';
import { TaskHandlingService } from 'src/app/services/issues/task-handling.service';


interface TaskAmounts {
  [key: string] : number
}

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.css']
})
export class AggregateComponent implements OnDestroy  {
  taskPriorities = Object.values(TaskPriority).filter(task => typeof task == 'string');
  taskAmounts: TaskAmounts = {};
  totalAmount: number = 0;
  private dataSubscription: Subscription;

  constructor(private taskHandler: TaskHandlingService) {
    this.dataSubscription = taskHandler.dataChanged.subscribe(() => this.refresh());
    this.refresh();
  }

  refresh(){
    let tasks = this.taskHandler.fetchTasks();
    this.taskPriorities.forEach(priority => {
      this.taskAmounts[priority] = tasks.filter(task => task.priority == priority).length;
    });

    this.totalAmount = tasks.length;
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

}
