import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsersFormsComponent } from './Views/panels/users-forms/users-forms.component';
import { FinalFormModule } from './Views/panels/final-form/final-form.module';
import { PreviewFormComponent } from './Views/panels/final-form/preview-form/preview-form.component';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./Views/home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'forms',
        loadChildren: () => import('./Views/panels/admin-panel.module').then(m => m.AdminPanelModule)
    },
    {
        path: 'final-form/:uniqueId',
        loadChildren: () => import('./Views/panels/final-form/final-form.module').then(m => m.FinalFormModule)
    },
    {
        path: 'preview-form/:uniqueId',
        loadChildren: () => import('./Views/panels/final-form/final-form.module').then(m => m.FinalFormModule),
        component: PreviewFormComponent
    },
    {
        path: 'users-forms',
        loadChildren: () => import('./Views/panels/admin-panel.module').then(m => m.AdminPanelModule),
        component: UsersFormsComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'adminpanel',
        loadChildren: () => import('./Views/panels/admin-panel.module').then(m => m.AdminPanelModule),
    },
    {
        path: 'create-form',
        loadChildren: () => import('./Views/panels/add-form/add-form.module').then(m => m.AddFormModule),
    },
    {
        path: 'organization',
        loadChildren: () => import('./Views/panels/add-organization/add-organization.module').then(m => m.AddOrganizationModule),
    },
    {
        path: 'login',
        loadChildren: () => import('./Views/login/login.module').then(m => m.LoginModule),

    },
    {
        path: 'register',
        loadChildren: () => import('./Views/login/login.module').then(m => m.LoginModule),
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
