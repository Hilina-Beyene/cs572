import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    selector: 'user-detail',
    template: `<div>
                 The uuid that is provided doesn't exist
               </div>
            `,
    styleUrls: []
})

export class RejectUserDetailComponent {
    
}