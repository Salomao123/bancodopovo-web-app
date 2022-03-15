import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { VisitasService } from '../../../services/visitas.service';
import * as VisitasActions from '../actions/visitas.action';
import { Visita } from '../../../models/visita';
import { selectVisitaState } from '../selectors/visitas.selectors';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { PageSort } from '../../../vo/page.sort';

@Injectable()
export class VisitasEffects extends BasePaginatorEffects {

    countVisita$ = super.baseCreateCount(VisitasActions.countVisita, VisitasActions.countVisitaSucesso, VisitasActions.countVisitaErro);

    countVisitaSucesso$ = super.baseCreateCountSuccess(VisitasActions.countVisitaSucesso);

    pesquisarVisita$ = super.baseCreateFind(VisitasActions.pesquisarVisita, selectVisitaState,
        VisitasActions.pesquisarVisitaSucesso, VisitasActions.pesquisarVisitaErro);

    salvarVisita$ = super.baseCreateSave(VisitasActions.salvarVisita, VisitasActions.salvarVisitaSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(VisitasActions.atualiarStatusVisita, VisitasActions.atualizarStatusVisitaSucesso);

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private visitasService: VisitasService) {
        super(action$, store);
    }

    countRegistros(filtro: Visita) {
        return this.visitasService.count(filtro);
    }

    findRegistros(pageSort: PageSort<Visita>) {
        return this.visitasService.pesquisar(pageSort);
    }

    saveRegistro(registro: Visita) {
        return this.visitasService.salvar(registro);
    }

    updateStatus(registro: Visita) {
        return this.visitasService.atualizarStatus(registro);
    }
}
