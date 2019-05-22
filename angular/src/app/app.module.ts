import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CounterOneComponent } from './Homework_12/counter1/counter.component';
import { CounterTwoComponent } from './Homework_12/counter2/counter.component';
import { SmartComponent } from './Homework_13/smart.component';
import { DumbComponent } from './Homework_13/dumb.component';

import { IsVisibleDirective } from './Homework_13/isVisible.directive';
import { MakeBiggerDirective } from './Homework_13/makeBigger.directive';

import { MultiPipes } from './Homework_13/multi.pipe';

import { UsersModule } from './Homework_14/users.module';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    CounterOneComponent,
    CounterTwoComponent,
    SmartComponent,
    DumbComponent,
    IsVisibleDirective,
    MakeBiggerDirective,
    MultiPipes
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    UsersModule
  ],
  providers: [HttpClient
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
