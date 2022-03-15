import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeConsignadoComponent } from './component/home-consignado/home-consignado.component';
import { HomeConsignadoRoutingModule } from './home-consignado-routing.module';



@NgModule({
  declarations: [HomeConsignadoComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    HomeConsignadoRoutingModule
  ]
})
export class HomeConsignadoModule { }
