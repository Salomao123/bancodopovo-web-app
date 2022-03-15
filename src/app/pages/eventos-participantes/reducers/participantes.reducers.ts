import { EntityAdapter } from '@ngrx/entity';
import { Participante } from '../../../models/participante';
import { createReducer, Action, on } from '@ngrx/store';
import * as EventosActions from '../actions/eventos.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<Participante> = getEntityAdapter<Participante>();

export interface ParticipantesState extends BaseEntityState<Participante> {}

export const initialParticipanteState: ParticipantesState = initialState(adapter, {});

const initParticipanteReducer = createReducer(
    initialParticipanteState,
    on(EventosActions.countParticipanteSucesso, (state, {filter, count}) => {
        return {...initialParticipanteState, filter, count};
    }),
    on(EventosActions.countParticipanteErro, (state) => ({...initialParticipanteState})),
    on(EventosActions.pesquisarParticipanteSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(EventosActions.adicionarParticipanteSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    })
);

export function participantesReducer(state: ParticipantesState | undefined, action: Action) {
    return initParticipanteReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
