import {Component, Input} from '@angular/core';

@Component({
    selector: 'dumb',
    template: `
        <span *ngFor="let obj of arrayOfObjects">
            Name: {{obj.name}},
            Age: {{obj.age}},
            Sex: {{obj.sex}}
            <br><br>
        </span>
    `,
    styleUrls: []
})

export class DumbComponent {
    @Input() arrayOfObjects = null;
}