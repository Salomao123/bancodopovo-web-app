import { EntityAdapter } from '@ngrx/entity';
import { Levantamento } from '../../../models/levantamento';
import { createReducer, Action, on } from '@ngrx/store';
import * as LevantamentosActions from '../actions/levantamentos.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<Levantamento> = getEntityAdapter<Levantamento>();

export interface LevantamentosState extends BaseEntityState<Levantamento> {}

export const initialLevantamentoState: LevantamentosState = initialState(adapter, {});

const initLevantamentoReducer = createReducer(
    initialLevantamentoState,
    on(LevantamentosActions.countLevantamentoSucesso, (state, {filter, count}) => {
        return {...initialLevantamentoState, filter, count};
    }),
    on(LevantamentosActions.countLevantamentoErro, (state) => ({...initialLevantamentoState})),
    on(LevantamentosActions.pesquisarLevantamentoSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(LevantamentosActions.salvarLevantamentoSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    })
);

export function levantamentosReducer(state: LevantamentosState | undefined, action: Action) {
    return initLevantamentoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
