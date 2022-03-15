import { EmprestimoDetalheRoutingModule } from './emprestimo-detalhe-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmprestimoDetalheComponent } from './components/emprestimo-detalhe/emprestimo-detalhe.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EmprestimoDetalheEffects } from './effects/emprestimo-detalhe.effects';
import { DirectivesModule } from '../../common/directives/directives.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxBarcodeModule } from 'ngx-barcode';

import {
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  declarations: [EmprestimoDetalheComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    EmprestimoDetalheRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    NgxBarcodeModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

  ],
  exports: [ MatAutocompleteModule, MatInputModule],
})
export class EmprestimoDetalheModule { }
