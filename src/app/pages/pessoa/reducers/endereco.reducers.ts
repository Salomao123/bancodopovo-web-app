import { EntityAdapter } from '@ngrx/entity';
import { Endereco } from '../../../models/endereco';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState, updateRegStatus } from '../../base.reducers.paginator';
import { createReducer, Action, on } from '@ngrx/store';
import { Uf } from '../../../models/uf';
import * as EnderecoActions from '../actions/endereco.action';
import { UfCidades } from '../../../models/uf-cidades';

export const adapter: EntityAdapter<Endereco> = getEntityAdapter<Endereco>();

export interface EnderecoState extends BaseEntityState<Endereco> {
    ufs: Uf[];
    ufSelecionada: number;
    ufCidades: UfCidades[];
}

export const initialEnderecoState: EnderecoState = initialState(adapter, {
    ufs: undefined,
    ufSelecionada: undefined,
    ufCidades: undefined
});

const initEnderecoReducer = createReducer(
    initialEnderecoState,
    on(EnderecoActions.listarUfEnderecoSucesso, (state, {ufs}) => ({...state, ufs})),
    on(EnderecoActions.listarUfEnderecoErro, (state) => ({...state, ufs: undefined, ufCidades: undefined})),
    on(EnderecoActions.listarCidadeEnderecoSucesso, (state, {idUf, cidades}) => {
        const ufCidades = (state.ufCidades) ? state.ufCidades : [];

        return {...state, ufSelecionada: idUf,
            ufCidades: [...ufCidades, {
            idUf, cidades
            }]
        };
    }),
    on(EnderecoActions.listarCidadeEnderecoErro, (state) => ({...state})),
    on(EnderecoActions.countEnderecoSucesso, (state, {filter, count}) => {
        return {...initialEnderecoState, ufs: state.ufs, filter, count};
    }),
    on(EnderecoActions.countEnderecoErro, (state) => ({...initialEnderecoState, ufs: state.ufs})),
    on(EnderecoActions.pesquisarEnderecoSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(EnderecoActions.salvarEnderecoSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(EnderecoActions.atualizarStatusEnderecoSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    })
);

export function enderecoReducer(state: EnderecoState | undefined, action: Action) {
    return initEnderecoReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
