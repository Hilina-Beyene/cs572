import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    selector: 'user-detail',
    template: `<div>
                 <h1>The user detail</h1>
                 {{userDetail}}
               </div>
            `,
    styleUrls: []
})

export class UserDetailComponent implements OnInit, OnDestroy{
    userDetail = 'no data';
    private subscription: Subscription
    uuid: string;
    
    constructor(private userService: UserService, 
        private route: ActivatedRoute) {

        }

    ngOnInit(){
        this.getUuid();
    }

    getUuid() {
        this.subscription = this.route.params.subscribe(
            (param: any) => {
                this.uuid = param['uuid']
                this.getIndividualUserByUuid(this.uuid);
            });
    }
    getIndividualUserByUuid(input) {
        this.userDetail = JSON.stringify(this.userService.getIndividualUserByUuid(
            'data' , input
        ));      
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}