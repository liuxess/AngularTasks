import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FirestoreModule } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { RegistryWindowComponent } from './components/registry-window/registry-window.component';
import { TileComponent } from './components/registration/tile/tile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    RegistryWindowComponent,
    TileComponent,
  ],
  imports: [
    BrowserModule,
    FirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
