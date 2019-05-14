import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterOneComponent } from './counter1/counter.component';
import { CounterTwoComponent } from './counter2/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterOneComponent,
    CounterTwoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
