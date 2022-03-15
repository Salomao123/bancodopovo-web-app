import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { LevantamentosService } from '../../../services/levantamentos.service';
import * as LevantamentosActions from '../actions/levantamentos.action';
import { Levantamento } from '../../../models/levantamento';
import { selectLevantamentoState } from '../selectors/levantamentos.selectors';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { PageSort } from '../../../vo/page.sort';

@Injectable()
export class LevantamentosEffects extends BasePaginatorEffects {

    countLevantamento$ = super.baseCreateCount(LevantamentosActions.countLevantamento, LevantamentosActions.countLevantamentoSucesso, LevantamentosActions.countLevantamentoErro);

    countLevantamentoSucesso$ = super.baseCreateCountSuccess(LevantamentosActions.countLevantamentoSucesso);

    pesquisarLevantamento$ = super.baseCreateFind(LevantamentosActions.pesquisarLevantamento, selectLevantamentoState,
        LevantamentosActions.pesquisarLevantamentoSucesso, LevantamentosActions.pesquisarLevantamentoErro);

    salvarLevantamento$ = super.baseCreateSave(LevantamentosActions.salvarLevantamento, LevantamentosActions.salvarLevantamentoSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(LevantamentosActions.atualiarStatusLevantamento, LevantamentosActions.atualizarStatusLevantamentoSucesso);

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
