import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { LevantamentosService } from '../../../services/levantamentos.service';
import * as LevantamentoNovoActions from '../actions/levantamento-novo.action';
import { Levantamento } from '../../../models/levantamento';
import { selectLevantamentoState } from '../selectors/levantamento-novo.selectors';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { PageSort } from '../../../vo/page.sort';

@Injectable()
export class LevantamentoNovoEffects extends BasePaginatorEffects {

    countLevantamento$ = super.baseCreateCount(LevantamentoNovoActions.countLevantamento, LevantamentoNovoActions.countLevantamentoSucesso, LevantamentoNovoActions.countLevantamentoErro);

    countLevantamentoSucesso$ = super.baseCreateCountSuccess(LevantamentoNovoActions.countLevantamentoSucesso);

    pesquisarLevantamento$ = super.baseCreateFind(LevantamentoNovoActions.pesquisarLevantamento, selectLevantamentoState,
        LevantamentoNovoActions.pesquisarLevantamentoSucesso, LevantamentoNovoActions.pesquisarLevantamentoErro);

    salvarLevantamento$ = super.baseCreateSave(LevantamentoNovoActions.salvarLevantamento, LevantamentoNovoActions.salvarLevantamentoSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(LevantamentoNovoActions.atualiarStatusLevantamento, LevantamentoNovoActions.atualizarStatusLevantamentoSucesso);

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private levantamentosService: LevantamentosService) {
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
}
