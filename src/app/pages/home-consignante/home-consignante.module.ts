import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeConsignanteComponent } from './components/home-consignante/home-consignante.component';
import { HomeConsignanteRoutingModule } from './home-consignante-routing.module';



@NgModule({
  declarations: [HomeConsignanteComponent],
  imports: [
    CommonModule,
    HomeConsignanteRoutingModule
  ]
})
export class HomeConsignanteModule { }
