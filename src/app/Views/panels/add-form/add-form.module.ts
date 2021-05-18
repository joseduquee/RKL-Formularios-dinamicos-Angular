import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFormRoutingModule } from './add-form-routing.module';
import { AddFormComponent } from './add-form.component';
import { SharedModule } from '../SharedComponents/shared-module/shared.module';


@NgModule({
  declarations: [
    AddFormComponent
  ],
  imports: [
    CommonModule,
    AddFormRoutingModule,
    SharedModule
  ]
})
export class AddFormModule { }
