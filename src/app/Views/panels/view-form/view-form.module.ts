import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewFormRoutingModule } from './view-form-routing.module';
import { ViewFormComponent } from './view-form.component';
import { SharedModule } from '../SharedComponents/shared-module/shared.module';


@NgModule({
  declarations: [
    ViewFormComponent
  ],
  imports: [
    CommonModule,
    ViewFormRoutingModule,
    SharedModule
  ]
})
export class ViewFormModule { }
