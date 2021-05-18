import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersFormsRoutingModule } from './users-forms-routing.module';
import { UsersFormsComponent } from './users-forms.component';
import { SharedModule } from '../SharedComponents/shared-module/shared.module';
@NgModule({
  declarations: [
    UsersFormsComponent
  ],
  imports: [
    CommonModule,
    UsersFormsRoutingModule,
    SharedModule
  ]
})
export class UsersFormsModule { }
