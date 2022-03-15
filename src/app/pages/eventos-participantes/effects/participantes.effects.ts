import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { EventosService } from '../../../services/eventos.service';
import * as EventosActions from '../actions/eventos.action';
import { Participante } from '../../../models/participante';
import { selectParticipanteState } from '../selectors/participantes.selectors';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { PageSort } from '../../../vo/page.sort';

@Injectable()
export class ParticipantesEffects extends BasePaginatorEffects {

    countParticipante$ = super.baseCreateCount(EventosActions.countParticipante, EventosActions.countParticipanteSucesso, EventosActions.countParticipanteErro);

    countParticipanteSucesso$ = super.baseCreateCountSuccess(EventosActions.countParticipanteSucesso);

    pesquisarParticipante$ = super.baseCreateFind(EventosActions.pesquisarParticipante, selectParticipanteState,
        EventosActions.pesquisarParticipanteSucesso, EventosActions.pesquisarParticipanteErro);

    adicionarParticipante$ = super.baseCreateSave(EventosActions.adicionarParticipante, EventosActions.adicionarParticipanteSucesso);

    excluirParticipante$ = super.baseCreateSave(EventosActions.excluirParticipante, EventosActions.excluirParticipanteSucesso);
    
    constructor(private action$: Actions,
                private store: Store<AppState>,
                private eventosService: EventosService) {
        super(action$, store);
    }

    countRegistros(filtro: Participante) {
        return this.eventosService.countParticipante(filtro);
    }

    findRegistros(pageSort: PageSort<Participante>) {
        return this.eventosService.pesquisarParticipante(pageSort);
    }

    saveRegistro(registro: Participante) {
        return null;
    }

    saveRegistroParticipante(registro: Participante) {
        return this.eventosService.salvarParticipante(registro);
    }

    deleteRegistroParticipante(registro: Participante) {
        return this.eventosService.excluirParticipante(registro);
    }

    updateStatus(registro: Participante) {
        return null;
    }

}
