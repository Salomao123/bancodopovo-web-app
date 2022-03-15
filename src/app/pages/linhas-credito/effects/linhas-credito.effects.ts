import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { LinhasCreditoService } from '../../../services/linhas-credito.service';
import * as LinhasCreditoActions from '../actions/linhas-credito.action';
import { LinhaCredito } from '../../../models/linha-credito';
import { selectLinhasCreditoState } from '../selectors/linhas-credito.selectors';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { PageSort } from '../../../vo/page.sort';

@Injectable()
export class LinhasCreditoEffects extends BasePaginatorEffects {

    countLinhaCredito$ = super.baseCreateCount(LinhasCreditoActions.countLinhaCredito, LinhasCreditoActions.countLinhaCreditoSucesso, LinhasCreditoActions.countLinhaCreditoErro);

    countLinhaCreditoSucesso$ = super.baseCreateCountSuccess(LinhasCreditoActions.countLinhaCreditoSucesso);

    pesquisarLinhaCredito$ = super.baseCreateFind(LinhasCreditoActions.pesquisarLinhaCredito, selectLinhasCreditoState,
        LinhasCreditoActions.pesquisarLinhaCreditoSucesso, LinhasCreditoActions.pesquisarLinhaCreditoErro);

    salvarLinhaCredito$ = super.baseCreateSave(LinhasCreditoActions.salvarLinhaCredito, LinhasCreditoActions.salvarLinhaCreditoSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(LinhasCreditoActions.atualiarStatusLinhaCredito, LinhasCreditoActions.atualizarStatusLinhaCreditoSucesso);

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private linhasCreditoService: LinhasCreditoService) {
        super(action$, store);
    }

    countRegistros(filtro: LinhaCredito) {
        return this.linhasCreditoService.count(filtro);
    }

    findRegistros(pageSort: PageSort<LinhaCredito>) {
        return this.linhasCreditoService.pesquisar(pageSort);
    }

    saveRegistro(registro: LinhaCredito) {
        return this.linhasCreditoService.salvar(registro);
    }

    updateStatus(registro: LinhaCredito) {
        return this.linhasCreditoService.atualizarStatus(registro);
    }
}
