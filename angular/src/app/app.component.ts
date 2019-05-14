import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
    <div>
      <counter1 [counter]="counterValueOne" (counterChange)="onChangeOne($event)"></counter1>
      <p>
        <span>Component1 Counter Value = {{componentCounterValueOne}} </span>
      </p>
    </div>
    <div>
      <counter2 [counter]="counterValueTwo" (counterChange)="onChangeTwo($event)"></counter2>
      <p>
        <span>Component2 Counter Value = {{componentCounterValueTwo}} </span>
      </p>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  counterValueOne = 5;
  counterValueTwo = 3;
  componentCounterValueOne;
  componentCounterValueTwo;

  onChangeOne(value) {
    this.componentCounterValueOne = value;
  }

  onChangeTwo(value) {
    this.componentCounterValueTwo = value;
  }
}
