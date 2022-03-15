import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginOrgaoComponent } from './components/login-orgao/login-orgao.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha.component';

const routes: Routes = [
    {
        path: '',
        component: LoginAdminComponent
    },
    /*{
        path: 'orgao',
        component: LoginOrgaoComponent
    },*/
    {
        path: 'admin',
        component: LoginAdminComponent
    },
    {
        path: 'alterar-senha',
        component: AlterarSenhaComponent
    },
    {
        path: 'esqueci-senha',
        component: EsqueciSenhaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
