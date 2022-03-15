import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { EventosService } from '../../../services/eventos.service';
import * as EventosActions from '../actions/eventos.action';
import { Evento } from '../../../models/evento';
import { selectEventoState } from '../selectors/eventos.selectors';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { PageSort } from '../../../vo/page.sort';

@Injectable()
export class EventosEffects extends BasePaginatorEffects {

    countEvento$ = super.baseCreateCount(EventosActions.countEvento, EventosActions.countEventoSucesso, EventosActions.countEventoErro);

    countEventoSucesso$ = super.baseCreateCountSuccess(EventosActions.countEventoSucesso);

    pesquisarEvento$ = super.baseCreateFind(EventosActions.pesquisarEvento, selectEventoState,
        EventosActions.pesquisarEventoSucesso, EventosActions.pesquisarEventoErro);

    salvarEvento$ = super.baseCreateSave(EventosActions.salvarEvento, EventosActions.salvarEventoSucesso);

    atualizarStatus = super.baseCreateUpdateStatusEvento(EventosActions.atualiarStatusEvento, EventosActions.atualizarStatusEventoSucesso);

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private eventosService: EventosService) {
        super(action$, store);
    }

    countRegistros(filtro: Evento) {
        return this.eventosService.count(filtro);
    }

    findRegistros(pageSort: PageSort<Evento>) {
        return this.eventosService.pesquisar(pageSort);
    }

    saveRegistro(registro: Evento) {
        return this.eventosService.salvar(registro);
    }

    updateStatus(registro: Evento) {
        return this.eventosService.atualizarStatus(registro);
    }
}
