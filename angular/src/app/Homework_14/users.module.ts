import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserDetailComponent } from './userdetail.component';
import { RejectUserDetailComponent } from './rejectUserDetail.component';

import { UserService } from './user.service';

import { UserGuard } from './user.guard';

const routes: Routes = [
    {
      path: 'user',
      component: UserComponent
    },
    {
      path: 'user/:uuid',
      component: UserDetailComponent,
      canActivate: [UserGuard]
    },
    {
      path: 'not-found',
      component: RejectUserDetailComponent
    }
];

@NgModule({
  declarations: [
    UserComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
      UserService,
      UserGuard
  ],
  exports: [
    UserComponent,
    UserDetailComponent,
    RejectUserDetailComponent
  ]
})
export class UsersModule { }