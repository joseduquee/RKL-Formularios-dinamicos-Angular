import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinalFormRoutingModule } from './final-form-routing.module';
import { FinalFormComponent } from './final-form.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    FinalFormComponent,
    PreviewFormComponent
  ],
  imports: [
    CommonModule,
    FinalFormRoutingModule,
    [SweetAlert2Module.forRoot()]
  ]
})
export class FinalFormModule { }
