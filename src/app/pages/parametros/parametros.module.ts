import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametrosComponent } from './components/parametros/parametros.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../common/components/components.module';
import { DirectivesModule } from '../../common/directives/directives.module';
import { ParametrosRoutingModule } from './parametros-routing.module';
import { StoreModule } from '@ngrx/store';
import { parametroReducer } from './reducers/parametros.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ParametrosEffect } from './effects/parametros.effects';
import { ParametrosBoletoComponent } from './components/parametros-boleto/parametros-boleto.component';



@NgModule({
  declarations: [ParametrosComponent, ParametrosBoletoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    DirectivesModule,
    ParametrosRoutingModule,

    /**
     * Redux
     */
    StoreModule.forFeature('parametros', parametroReducer),
    EffectsModule.forFeature([ParametrosEffect])
  ]
})
export class ParametrosModule { }
