import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/home-layout/home-layout.component').then(m => m.HomeLayoutComponent)
    },
    {
        path:'privacy-policy',
        loadComponent: () => import('./components/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
    },
      {
        path:'refund-policy',
        loadComponent: () => import('./components/refund-policy/refund-policy.component').then(m => m.RefundPolicyComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
