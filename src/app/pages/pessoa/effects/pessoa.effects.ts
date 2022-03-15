import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { PessoaService } from '../../../services/pessoa.service';
import * as PessoaActions from '../actions/pessoa.action';
import { Pessoa } from '../../../models/pessoa';
import { selectPessoaState } from '../selectors/pessoa.selectots';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { PageSort } from '../../../vo/page.sort';

@Injectable()
export class PessoaEffects extends BasePaginatorEffects {

    countPessoa$ = super.baseCreateCount(PessoaActions.countPessoa, PessoaActions.countPessoaSucesso, PessoaActions.countPessoaErro);

    countPessoaSucesso$ = super.baseCreateCountSuccess(PessoaActions.countPessoaSucesso);

    pesquisarPessoa$ = super.baseCreateFind(PessoaActions.pesquisarPessoa, selectPessoaState,
        PessoaActions.pesquisarPessoaSucesso, PessoaActions.pesquisarPessoaErro);

    salvarPessoa$ = super.baseCreateSave(PessoaActions.salvarPessoa, PessoaActions.salvarPessoaSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(PessoaActions.atualiarStatusPessoa, PessoaActions.atualizarStatusPessoaSucesso);

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private pessoaService: PessoaService) {
        super(action$, store);
    }

    countRegistros(filtro: Pessoa) {
        return this.pessoaService.count(filtro);
    }

    findRegistros(pageSort: PageSort<Pessoa>) {
        return this.pessoaService.pesquisar(pageSort);
    }

    saveRegistro(registro: Pessoa) {
        return this.pessoaService.salvar(registro);
    }

    updateStatus(registro: Pessoa) {
        return this.pessoaService.atualizarStatus(registro);
    }
}
