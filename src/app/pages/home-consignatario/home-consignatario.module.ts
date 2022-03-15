import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeConsignatarioComponent } from './components/home-consignatario/home-consignatario.component';
import { HomeConsignatarioRoutingModule } from './home-consignatario-routing.module';



@NgModule({
  declarations: [HomeConsignatarioComponent],
  imports: [
    CommonModule,
    HomeConsignatarioRoutingModule
  ]
})
export class HomeConsignatarioModule { }
