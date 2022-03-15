import { EntityAdapter } from '@ngrx/entity';
import { Pessoa } from '../../../models/pessoa';
import { createReducer, Action, on } from '@ngrx/store';
import * as PessoaActions from '../actions/pessoa.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<Pessoa> = getEntityAdapter<Pessoa>();

export interface PessoaState extends BaseEntityState<Pessoa> {}

export const initialPessoaState: PessoaState = initialState(adapter, {});

const initPessoaReducer = createReducer(
    initialPessoaState,
    on(PessoaActions.countPessoaSucesso, (state, {filter, count}) => {
        return {...initialPessoaState, filter, count};
    }),
    on(PessoaActions.countPessoaErro, (state) => ({...initialPessoaState})),
    on(PessoaActions.pesquisarPessoaSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(PessoaActions.salvarPessoaSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(PessoaActions.atualizarStatusPessoaSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    })
);

export function pessoaReducer(state: PessoaState | undefined, action: Action) {
    return initPessoaReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
