import { EmprestimosRoutingModule } from './emprestimos-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmprestimosComponent } from './components/emprestimos/emprestimos.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { emprestimosReducer } from './reducers/emprestimos.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EmprestimosEffects } from './effects/emprestimos.effects';
import { FormsModule } from '@angular/forms';
import { EmprestimosNovoComponent } from './components/emprestimos-novo/emprestimos-novo.component';
import { DirectivesModule } from '../../common/directives/directives.module';


@NgModule({
  declarations: [EmprestimosComponent, EmprestimosNovoComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    EmprestimosRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('emprestimos', emprestimosReducer),
    EffectsModule.forFeature([EmprestimosEffects])
  ]
})
export class EmprestimosModule { }
