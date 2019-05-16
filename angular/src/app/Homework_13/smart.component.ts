import {Component} from '@angular/core';

@Component({
    selector: 'smart',
    template: `
        <div>
            <h1>Array of Object</h1>
            <dumb [arrayOfObjects]="array"></dumb>
        </div>
    `,
    styleUrls: []
})

export class SmartComponent  {
    
    array = [
        {name: "Asaad", age: 40, sex: "male"},
        {name: "Elsi", age: 29, sex:"female"},
        {name: "Hlina", age: 24, sex: "female"},
        {name: "Miku", age: 24, sex: "male"},
        {name: "Eshe", age: 28, sex: "male"},
        {name: "Gize", age: 29, sex: "male"}
    ];

}