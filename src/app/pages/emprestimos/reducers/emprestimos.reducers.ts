import { EntityAdapter } from '@ngrx/entity';
import { Emprestimo } from '../../../models/emprestimo';
import { createReducer, Action, on } from '@ngrx/store';
import * as EmprestimosActions from '../actions/emprestimos.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<Emprestimo> = getEntityAdapter<Emprestimo>();

export interface EmprestimosState extends BaseEntityState<Emprestimo> {}

export const initialEmprestimoState: EmprestimosState = initialState(adapter, {});

const initEmprestimoReducer = createReducer(
    initialEmprestimoState,
    on(EmprestimosActions.countEmprestimoSucesso, (state, {filter, count}) => {
        return {...initialEmprestimoState, filter, count};
    }),
    on(EmprestimosActions.countEmprestimoErro, (state) => ({...initialEmprestimoState})),
    on(EmprestimosActions.pesquisarEmprestimoSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(EmprestimosActions.salvarEmprestimoSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(EmprestimosActions.atualizarStatusEmprestimoSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    })
);

export function emprestimosReducer(state: EmprestimosState | undefined, action: Action) {
    return initEmprestimoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
