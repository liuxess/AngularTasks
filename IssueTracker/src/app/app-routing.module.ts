import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';


const routes: Routes = [
  { path: 'list', component: MainComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' } // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
