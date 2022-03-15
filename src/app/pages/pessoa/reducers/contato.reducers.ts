import { EntityAdapter } from '@ngrx/entity';
import { Contato } from '../../../models/contato';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState, updateRegStatus } from '../../base.reducers.paginator';
import { createReducer, on, Action } from '@ngrx/store';
import * as ContatoActions from '../actions/contato.action';

export const adapter: EntityAdapter<Contato> = getEntityAdapter<Contato>();

export interface ContatoState extends BaseEntityState<Contato> {}

export const initialContatoState: ContatoState = initialState(adapter, {});

const initContatoReducer = createReducer(
    initialContatoState,
    on(ContatoActions.countContatoSucesso, (state, {filter, count}) => {
        return {...initialContatoState, filter, count};
    }),
    on(ContatoActions.countContatoErro, (state) => ({...initialContatoState})),
    on(ContatoActions.pesquisarContatoSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(ContatoActions.salvarContatoSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(ContatoActions.atualizarStatusContatoSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    })
);

export function contatoReducer(state: ContatoState | undefined, action: Action) {
    return initContatoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
