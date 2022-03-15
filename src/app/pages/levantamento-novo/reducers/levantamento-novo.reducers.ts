import { EntityAdapter } from '@ngrx/entity';
import { Levantamento } from '../../../models/levantamento';
import { createReducer, Action, on } from '@ngrx/store';
import * as LevantamentosActions from '../actions/levantamento-novo.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<Levantamento> = getEntityAdapter<Levantamento>();

export interface LevantamentoNovoState extends BaseEntityState<Levantamento> {}

export const initialLevantamentoState: LevantamentoNovoState = initialState(adapter, {});

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
    }),
    on(LevantamentosActions.atualizarStatusLevantamentoSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    })
);

export function levantamentosReducer(state: LevantamentoNovoState | undefined, action: Action) {
    return initLevantamentoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
