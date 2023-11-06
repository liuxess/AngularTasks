import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/tasks/list/list.component';
import { CardComponent } from './components/task/card/card.component';
import { FormsModule } from '@angular/forms';
import { TaskSelectorComponent } from './components/task/priorities/selector/selector.component';
import { NewTaskComponent } from './components/task/new/new.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListComponent,
    CardComponent,
    TaskSelectorComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
