import { Injectable } from '@angular/core';
import { DataRepositoryService, IStoreable } from '../data-repository.service';
import { IIssue } from 'src/app/models/issues/issue';



const dataKey: string = "IssueList";

@Injectable({
  providedIn: 'root'
})
export class IssueListService {
  issueList: IIssue[];

  constructor(private dataRepository: DataRepositoryService) { 
    this.issueList = dataRepository.read<IIssue[]>(dataKey) ?? [];
  }

  fetch(): IIssue[]{
    return this.issueList;
  }

  add(issue: IIssue): void{
    let maxId = this.issueList.length > 0 ? this.issueList.reduce((a,b)=> a.id > b.id? a : b).id : 0;
    let newId = maxId + 1;
    issue.id = newId;
    this.issueList.push(issue);
    this.save();
  }

  update(issue: IIssue): void{
    let existingIndex = this.issueList.findIndex(i => i.id = issue.id)
    this.issueList[existingIndex] = issue;
    this.save();
  }

  remove(id: number){
    this.issueList = this.issueList.filter(issue => issue.id != id);
    this.save();
  }

  private save(){
    let storeable: IStoreable<IIssue[]> = {key: dataKey, value: this.issueList }
    this.dataRepository.save(storeable);
  }


}
