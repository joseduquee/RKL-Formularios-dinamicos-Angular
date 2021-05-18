import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalFormComponent } from './final-form.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';

const routes: Routes = [
  {
    path: '',
    component: FinalFormComponent,
  },
  {
    path: 'preview-form',
    component: PreviewFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalFormRoutingModule { }
