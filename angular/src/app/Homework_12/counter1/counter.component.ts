import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'counter1',
  templateUrl: './counter.component.html',
  styles: []
})
export class CounterOneComponent implements OnInit {
  @Input() counter = 0;
  @Output() counterChange = new EventEmitter();
  counterValue = 0;

  constructor() { }

  ngOnInit() {
    //this.counterChange = new EventEmitter();
    if(this.counter){
      this.counterValue = this.counter;
      this.counter = 0;
      this.counterChange.emit(this.counterValue+'');
    }
  }

  increase() {
    this.common('+');
  }
  decrease(){
    this.common('-');
  }

  common(sign) {
    if(this.counter){
      this.counterValue = this.counter;
      this.counter = 0;
      this.counterChange.emit(this.counterValue+'');
    }else{
      if(sign === '-'){
        this.counterValue -= 1;
        this.counterChange.emit(this.counterValue+'');
      }else if(sign === '+'){
        this.counterValue += 1;
        this.counterChange.emit(this.counterValue+'');
      }
    }
  }
}
