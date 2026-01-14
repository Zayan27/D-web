import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent
    },
    {
        path:'privacy-policy',
        component: PrivacyPolicyComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
