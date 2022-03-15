import { EntityAdapter } from '@ngrx/entity';
import { Evento } from '../../../models/evento';
import { createReducer, Action, on } from '@ngrx/store';
import * as EventosActions from '../actions/eventos.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatusEvento, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<Evento> = getEntityAdapter<Evento>();

export interface EventosState extends BaseEntityState<Evento> {}

export const initialEventoState: EventosState = initialState(adapter, {});

const initEventoReducer = createReducer(
    initialEventoState,
    on(EventosActions.countEventoSucesso, (state, {filter, count}) => {
        return {...initialEventoState, filter, count};
    }),
    on(EventosActions.countEventoErro, (state) => ({...initialEventoState})),
    on(EventosActions.pesquisarEventoSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(EventosActions.salvarEventoSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(EventosActions.atualizarStatusEventoSucesso, (state, {id, status}) => {
        return updateRegStatusEvento(adapter, state, id, status);
    })
);

export function eventosReducer(state: EventosState | undefined, action: Action) {
    return initEventoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
