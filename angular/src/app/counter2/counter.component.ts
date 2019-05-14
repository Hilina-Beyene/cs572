import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'counter2',
  templateUrl: './counter.component.html',
  styles: []
})
export class CounterTwoComponent implements OnInit {
  @Input() counter = 0;
  @Output() counterChange = new EventEmitter();
  counterValue = 0;

  constructor() { }

  ngOnInit() {
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
