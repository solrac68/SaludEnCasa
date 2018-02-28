import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'

import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDdNAZdMByjs7ysJtrnacOvuu2w8GSEbk4'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
