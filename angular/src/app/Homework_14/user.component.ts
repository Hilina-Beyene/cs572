import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    selector: 'user',
    template: `<p>
                  <span *ngFor="let result of results">
                    Geneder: {{result.gender}}, 
                    Name: {{result.name.title}}, {{result.name.first}}, {{result.name.last}}
                    <br>
                  </span>
                  <input (keyup)="getIndividualUserByUuid($event)"/>
                 <!-- <button (click)="getIndividualUserByUuid()">
                  uuid
                  </button>-->
               </p>`,
    styleUrls: [],
    //providers: [UserService]
})

export class UserComponent { 
    results = new Array<User>();
    localData = new Array<User>();

    constructor(private userService: UserService) {
        this.localData = this.getFromLocalStorage();
        console.log(this.localData);
    }

    ngOnInit() {
        this.getJsonObject();
    }

    getJsonObject() {
        this.userService.getJsonObjects().subscribe(res => {
            this.results = res.results;
            this.saveToLocalStorage();
        });
    }

    saveToLocalStorage() {
        this.userService.setDataToLocalStorage('data', this.results);
    }

    getFromLocalStorage() {
        return this.userService.getDataFromLocalStorage('data');
    }
}