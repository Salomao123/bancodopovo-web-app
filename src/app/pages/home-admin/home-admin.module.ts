import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './component/home-admin/home-admin.component';
import { HomeAdminRoutingModule } from './home-admin-routing.module';
import { ComponentsModule } from '../../common/components/components.module';
import { TesteImpressaoComponent } from './component/teste-impressao/teste-impressao.component';



@NgModule({
  declarations: [HomeAdminComponent, TesteImpressaoComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    HomeAdminRoutingModule
  ]
})
export class HomeAdminModule { }
