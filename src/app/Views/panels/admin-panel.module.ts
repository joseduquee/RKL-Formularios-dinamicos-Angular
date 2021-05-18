import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { SharedModule } from './SharedComponents/shared-module/shared.module';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { FinalFormComponent } from './final-form/final-form.component';



@NgModule({
  declarations: [
    AdminPanelComponent
    ],
  imports: [
    CommonModule,
    FormsRoutingModule,
    SharedModule
  ]
})
export class AdminPanelModule { }
