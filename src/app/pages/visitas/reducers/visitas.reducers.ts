import { EntityAdapter } from '@ngrx/entity';
import { Visita } from '../../../models/visita';
import { createReducer, Action, on } from '@ngrx/store';
import * as VisitasActions from '../actions/visitas.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<Visita> = getEntityAdapter<Visita>();

export interface VisitasState extends BaseEntityState<Visita> {}

export const initialVisitaState: VisitasState = initialState(adapter, {});

const initVisitaReducer = createReducer(
    initialVisitaState,
    on(VisitasActions.countVisitaSucesso, (state, {filter, count}) => {
        return {...initialVisitaState, filter, count};
    }),
    on(VisitasActions.countVisitaErro, (state) => ({...initialVisitaState})),
    on(VisitasActions.pesquisarVisitaSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(VisitasActions.salvarVisitaSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(VisitasActions.atualizarStatusVisitaSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    })
);

export function visitasReducer(state: VisitasState | undefined, action: Action) {
    return initVisitaReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
