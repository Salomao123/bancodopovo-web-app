import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { LevantamentosService } from '../../../services/levantamentos.service';
import { UsuarioService } from '../../../services/usuario.service';
import * as PessoaDocumentoActions from '../actions/pessoa-documento.action';
import { Levantamento } from '../../../models/levantamento';
import { selectPessoaDocumentoState } from '../selectors/pessoa-documento.selectors';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { PageSort } from '../../../vo/page.sort';

@Injectable()
export class PessoaDocumentoEffects extends BasePaginatorEffects {

    countLevantamento$ = super.baseCreateCount(PessoaDocumentoActions.countLevantamento, PessoaDocumentoActions.countLevantamentoSucesso, PessoaDocumentoActions.countLevantamentoErro);

    countLevantamentoSucesso$ = super.baseCreateCountSuccess(PessoaDocumentoActions.countLevantamentoSucesso);

    pesquisarLevantamento$ = super.baseCreateFind(PessoaDocumentoActions.pesquisarLevantamento, selectPessoaDocumentoState,
        PessoaDocumentoActions.pesquisarLevantamentoSucesso, PessoaDocumentoActions.pesquisarLevantamentoErro);

    salvarLevantamento$ = super.baseCreateSave(PessoaDocumentoActions.salvarLevantamento, PessoaDocumentoActions.salvarLevantamentoSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(PessoaDocumentoActions.atualiarStatusLevantamento, PessoaDocumentoActions.atualizarStatusLevantamentoSucesso);

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private levantamentosService: LevantamentosService,
                private usuarioService: UsuarioService) {
        super(action$, store);
    }

    countRegistros(filtro: Levantamento) {
        return this.levantamentosService.count(filtro);
    }

    findRegistros(pageSort: PageSort<Levantamento>) {
        return this.levantamentosService.pesquisar(pageSort);
    }

    saveRegistro(registro: Levantamento) {
        return this.levantamentosService.salvar(registro);
    }

    updateStatus(registro: Levantamento) {
        return this.levantamentosService.atualizarStatus(registro);
    }

    pesquisarPessoaId(idPessoa: number) {
        return this.usuarioService.recuperarPorId(idPessoa);
    }
}
