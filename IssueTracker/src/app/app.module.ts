import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/tasks/list/list.component';
import { CardComponent } from './components/task/card/card.component';
import { FormsModule } from '@angular/forms';
import { TaskSelectorComponent } from './components/task/priorities/selector/selector.component';
import { NewTaskComponent } from './components/task/new/new.component';
import { AggregateComponent } from './components/tasks/aggregate/aggregate.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { ModalComponent } from './components/task/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ListComponent,
    CardComponent,
    TaskSelectorComponent,
    NewTaskComponent,
    AggregateComponent,
    NavbarComponent,
    AboutComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
