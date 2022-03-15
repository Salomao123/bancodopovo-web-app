import { PessoaRoutingModule } from './pessoa-routing.module';
import { ComponentsModule } from './../../common/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaComponent } from './components/pessoa/pessoa.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { pessoaReducer } from './reducers/pessoa.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PessoaEffects } from './effects/pessoa.effects';
import { FormsModule } from '@angular/forms';
import { PessoaNovoComponent } from './components/pessoa-novo/pessoa-novo.component';
import { PessoaFinanceiroComponent } from './components/pessoa-financeiro/pessoa-financeiro.component';
import { DirectivesModule } from '../../common/directives/directives.module';
import { PessoaStatusComponent } from './components/pessoa-status/pessoa-status.component';
import { enderecoReducer } from './reducers/endereco.reducers';
import { EnderecoEffects } from './effects/endereco.effects';
import { EnderecoComponent } from './components/endereco/endereco.component';
import { EnderecoStatusComponent } from './components/endereco-status/endereco-status.component';
import { contatoReducer } from './reducers/contato.reducers';
import { ContatoEffects } from './effects/contato.effects';
import { ContatoComponent } from './components/contato/contato.component';
import { ContatoStatusComponent } from './components/contato-status/contato-status.component';

@NgModule({
  declarations: [PessoaComponent, PessoaNovoComponent, PessoaFinanceiroComponent, PessoaStatusComponent, EnderecoComponent, EnderecoStatusComponent, ContatoComponent, ContatoStatusComponent],
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    DirectivesModule,
    PessoaRoutingModule,

    /**
     * PrimeNg Modules
     */
    CalendarModule,
    TableModule,

    /**
     * Redux
     */
    StoreModule.forFeature('pessoas', pessoaReducer),
    StoreModule.forFeature('enderecos', enderecoReducer),
    StoreModule.forFeature('contatos', contatoReducer),
    EffectsModule.forFeature([PessoaEffects, EnderecoEffects, ContatoEffects])
  ]
})
export class PessoaModule { }
