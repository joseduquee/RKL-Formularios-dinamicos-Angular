import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
  },
  {
    path: 'view-form',
    loadChildren: () => import('./view-form/view-form.module').then(m => m.ViewFormModule)
  },
  {
    path: 'users-panels',
    loadChildren: () => import('./users-forms/users-forms.module').then( m => m.UsersFormsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
