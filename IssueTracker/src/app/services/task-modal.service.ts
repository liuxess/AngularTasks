import { Injectable, EventEmitter } from '@angular/core';
import { TaskIssue } from '../models/issues/issue';

@Injectable({
  providedIn: 'root'
})
export class TaskModalService {
  public toggleModalEvent: EventEmitter<TaskIssue> = new EventEmitter();

  constructor() {}

  public toggleModal() {
    this.toggleModalEvent.emit();
  }

  public toggleModalEdit(task: TaskIssue){
    this.toggleModalEvent.emit(task);
  }
}
