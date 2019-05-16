import { Component } from '@angular/core';
import { IsVisibleDirective } from './Homework_13/isVisible.directive';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
    <div>
      <h1>Homework_12</h1>
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
    <br> <br>
    <div>
      <h1>Homework_13</h1>
      <div isVisible [isvisible]="true">
        <h2>Is Visible</h2>
        <smart></smart>
      </div>
      <div makeBigger [bigger]="size">
        <h2>Make Bigger</h2>
        <p> Sample text to make it bigger.</p>
      </div>
      <button (click)="makeBigger()">Bigger</button>
      <div>
        <h1>Multi Pipe</h1>
        <span>{{pipeString | multi: 5}}</span>
      </div>
    </div>
    
  `,
  //directives: [IsVisibleDirective],
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'angular';
  pipeString = 'Hello';
  size;
  bigger = 25;
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

  makeBigger() {
    this.bigger += 2;
    this.size = this.bigger + 'px';
  }
}
