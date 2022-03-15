import { EntityAdapter } from '@ngrx/entity';
import { Levantamento } from '../../../models/levantamento';
import { Pessoa } from '../../../models/pessoa';
import { createReducer, Action, on } from '@ngrx/store';
import * as PessoaDocumentoActions from '../actions/pessoa-documento.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<Levantamento> = getEntityAdapter<Levantamento>();

export interface PessoaDocumentoState extends BaseEntityState<Levantamento> {
    pessoasFisicas: Pessoa[];
}

export const initialPessoaDocumentoState: PessoaDocumentoState = initialState(adapter, {
    pessoasFisicas: undefined
});

const initPessoaDocumentoReducer = createReducer(
    initialPessoaDocumentoState,
    on(PessoaDocumentoActions.countLevantamentoSucesso, (state, {filter, count}) => {
        return {...initialPessoaDocumentoState, filter, count};
    }),
    on(PessoaDocumentoActions.countLevantamentoErro, (state) => ({...initialPessoaDocumentoState})),
    on(PessoaDocumentoActions.pesquisarLevantamentoSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(PessoaDocumentoActions.salvarLevantamentoSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(PessoaDocumentoActions.atualizarStatusLevantamentoSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    })
);

export function pessoaDocumentoReducer(state: PessoaDocumentoState | undefined, action: Action) {
    return initPessoaDocumentoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
