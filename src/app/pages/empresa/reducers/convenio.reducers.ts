import { EntityAdapter } from '@ngrx/entity';
import { Convenio } from '../../../models/convenio';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState } from '../../base.reducers.paginator';
import { EmpresaConsignataria } from '../../../models/empresa-consignataria';
import { createReducer, on, Action } from '@ngrx/store';
import * as ConvenioActions from '../actions/convenio.actions';

export const adapter: EntityAdapter<Convenio> = getEntityAdapter<Convenio>();

export interface ConvenioState extends BaseEntityState<Convenio> {
    empresasConsignatarias: EmpresaConsignataria[];
}

export const initialConvenioState: ConvenioState = initialState(adapter, {
    empresasConsignatarias: undefined
});

const initConvenioReducer = createReducer(
    initialConvenioState,
    on(ConvenioActions.countConvenioSucesso, (state, {filter, count}) => {
        return {...initialConvenioState, filter, count, empresasConsignatarias: state.empresasConsignatarias};
    }),
    on(ConvenioActions.countConvenioErro, (state) => ({...initialConvenioState})),
    on(ConvenioActions.pesquisarConvenioSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(ConvenioActions.salvarConvenioSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(ConvenioActions.consultarEmpresasConsignatariasConvenioSucesso, (state, {empresasConsignatarias}) => {
        return {...state, empresasConsignatarias};
    }),
    on(ConvenioActions.atualizarStatusConvenioSucesso, (state, {id, situacao}) => {
        return adapter.updateOne({
            id,
            changes: {...state.entities[id], situacao}
        }, state);
    })
);

export function convenioReducer(state: ConvenioState | undefined, action: Action) {
    return initConvenioReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
