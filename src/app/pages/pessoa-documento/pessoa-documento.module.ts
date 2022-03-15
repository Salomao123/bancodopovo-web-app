import { PessoaDocumentoRoutingModule } from './pessoa-documento-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaDocumentoComponent } from './components/pessoa-documento/pessoa-documento.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { pessoaDocumentoReducer } from './reducers/pessoa-documento.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PessoaDocumentoEffects } from './effects/pessoa-documento.effects';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../common/directives/directives.module';


@NgModule({
  declarations: [PessoaDocumentoComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    PessoaDocumentoRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('pessoaDocumento', pessoaDocumentoReducer),
    EffectsModule.forFeature([PessoaDocumentoEffects])
  ]
})
export class PessoaDocumentoModule { }
