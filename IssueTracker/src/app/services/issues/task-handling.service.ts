import { Injectable } from '@angular/core';
import { IssueListService } from './issue-list.service';
import { TaskIssue, TaskPriority } from 'src/app/models/issues/issue';

@Injectable({
  providedIn: 'root'
})
export class TaskHandlingService {

  constructor(private issueList: IssueListService) { }

  fetchTasks(): TaskIssue[] {
    return this.issueList.fetch() as TaskIssue[];
  }

  createTask(task: string, priority: TaskPriority): void{
    let taskIssue: TaskIssue = {id: 0, task, priority};
    this.issueList.add(taskIssue);
  }

  updateTask(id: number, task: string, priority: TaskPriority){
    let taskIssue: TaskIssue = {id, task, priority};
    this.issueList.update(taskIssue);
  }

  delete(id: number){
    this.issueList.remove(id);
  }
}
