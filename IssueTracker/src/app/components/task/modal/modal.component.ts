
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskIssue, TaskPriority } from 'src/app/models/issues/issue';
import { TaskModalService } from 'src/app/services/task-modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  taskId: number;
  taskName: string;
  taskPriority: TaskPriority
  @Output() taskCreatedEvent = new EventEmitter<TaskIssue>();
  isModalOpen = false;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  constructor(private modalService: TaskModalService) {
    this.taskId = 0;
    this.taskName = "";
    this.taskPriority = TaskPriority.NONE;
  } 

  changePriority(priority: TaskPriority){
    console.log(priority);
    this.taskPriority = priority;
  }

  onSubmit(){
    let newTask: TaskIssue = {id: 0, task: this.taskName, priority: this.taskPriority};
    this.taskCreatedEvent.emit(newTask);
    this.toggleModal();
    this.taskId = 0;
    this.taskName = "";
    this.taskPriority = TaskPriority.NONE;
  }

  ngOnInit() {
    this.modalService.toggleModalEvent.subscribe((taskData: TaskIssue) => {
      if(!!taskData){
        this.taskId = taskData.id;
        this.taskName = taskData.task;
        this.taskPriority = taskData.priority;
      }
      this.toggleModal();
    });
  }

}
