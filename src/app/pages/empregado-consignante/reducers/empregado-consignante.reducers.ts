import { EntityAdapter } from '@ngrx/entity';
import { EmpregadoConsignante } from '../../../models/empregado-consignante';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState, updateRegStatus } from '../../base.reducers.paginator';
import { Pessoa } from '../../../models/pessoa';
import { Empresa } from '../../../models/empresa';
import { createReducer, Action, on } from '@ngrx/store';
import * as EmpregadoConsignanteActions from '../actions/empregado-consignante.actions';

export const adapter: EntityAdapter<EmpregadoConsignante> = getEntityAdapter<EmpregadoConsignante>();

export interface EmpregadoConsignanteState extends BaseEntityState<EmpregadoConsignante> {
    pessoasFisicas: Pessoa[];
    empresas: Empresa[];
}

export const initialEmpregadoConsignanteState: EmpregadoConsignanteState = initialState(adapter, {
    pessoasFisicaso: undefined,
    empresas: undefined
});

const initEmpregadoConsignanteReducer = createReducer(
    initialEmpregadoConsignanteState,
    on(EmpregadoConsignanteActions.countEmpregadoConsignanteSucesso, (state, {filter, count}) => {
        return {...initialEmpregadoConsignanteState, filter, count, pessoasFisicas: state.pessoasFisicas, empresas: state.empresas};
    }),
    on(EmpregadoConsignanteActions.countEmpregadoConsignanteErro, (state) => (
        {...initialEmpregadoConsignanteState, pessoasFisicas: state.pessoasFisicas, empresas: state.empresas}
    )),
    on(EmpregadoConsignanteActions.pesquisarEmpregadoConsignanteSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(EmpregadoConsignanteActions.salvarEmpregadoConsignanteSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(EmpregadoConsignanteActions.atualizarStatusEmpregadoConsignanteSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    }),
    on(EmpregadoConsignanteActions.consultarEmpresasEmpregadoConsignanteSucesso, (state, {empresas}) => (
        {...state, empresas}
    )),
    on(EmpregadoConsignanteActions.consultarPessoasFisicasEmpregadoConsignanteSucesso, (state, {pessoasFisicas}) => (
        {...state, pessoasFisicas}
    )),
    on(EmpregadoConsignanteActions.recuperarPorIdEmpregadoConsignanteSucesso, (state, {empregadoConsignante}) => {
        return adapter.upsertOne(empregadoConsignante, state);
    })
);

export function empregadoConsignanteReducer(state: EmpregadoConsignanteState | undefined, action: Action) {
    return initEmpregadoConsignanteReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
