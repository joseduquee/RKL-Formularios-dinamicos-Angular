import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOrganizationRoutingModule } from './add-organization-routing.module';
import { SharedModule } from '../SharedComponents/shared-module/shared.module';
import { AddOrganizationComponent } from './add-organization.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddOrganizationComponent
  ],
  imports: [
    CommonModule,
    AddOrganizationRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    [SweetAlert2Module.forRoot()]
  ]
})
export class AddOrganizationModule { }
