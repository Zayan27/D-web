import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './components/refund-policy/refund-policy.component';


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
        path:'refund-policy',
        component: RefundPolicyComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];
