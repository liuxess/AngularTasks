export enum TaskPriority{
    URGENT,
    ROUTINE,
    NOT_URGENT,
    VERY_URGENT,
    NONE
}

export class TaskIssue{
    id: number;
    task: string;
    priority: TaskPriority


    constructor() {
        this.id = 0;
        this.task = "";
        this.priority = TaskPriority.NONE;
    }
}

export interface IIssue{
    id: number;
  }