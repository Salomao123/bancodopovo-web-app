import { EntityAdapter } from '@ngrx/entity';
import { Representante } from '../../../models/representante';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState, updateRegStatus } from '../../base.reducers.paginator';
import { Pessoa } from '../../../models/pessoa';
import { createReducer, on, Action } from '@ngrx/store';
import * as RepresentateActions from '../actions/representante.actions';

export const adapter: EntityAdapter<Representante> = getEntityAdapter<Representante>();

export interface RepresentanteState extends BaseEntityState<Representante> {
    pessoasFisicas: Pessoa[];
}

export const initialRepresentanteState: RepresentanteState = initialState(adapter, {
    pessoasFisicas: undefined
});

const initRepresentanteReducer = createReducer(
    initialRepresentanteState,
    on(RepresentateActions.countRepresentanteSucesso, (state, {filter, count}) => {
        return {...initialRepresentanteState, filter, count, pessoasFisicas: (state as RepresentanteState).pessoasFisicas};
    }),
    on(RepresentateActions.countRepresentanteErro, (state) => ({...initialRepresentanteState})),
    on(RepresentateActions.pesquisarRepresentanteSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(RepresentateActions.salvarRepresentanteSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(RepresentateActions.atualizarStatusRepresentanteSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    }),
    on(RepresentateActions.consultarPessoasFisicasRepSucesso, (state, { pessoasFisicas }) => {
        return {...state, pessoasFisicas};
    })
);

export function representanteReducer(state: RepresentanteState | undefined, action: Action) {
    return initRepresentanteReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
