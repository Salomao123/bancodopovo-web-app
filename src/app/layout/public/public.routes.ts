import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
    {
        path: '',
        loadChildren: './public/login/login.module#LoginModule'
    }
];
