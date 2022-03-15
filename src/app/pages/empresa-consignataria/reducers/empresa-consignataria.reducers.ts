import { EntityAdapter } from '@ngrx/entity';
import { EmpresaConsignataria } from '../../../models/empresa-consignataria';
import {
    getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, upsertOnState, updateRegStatus
} from '../../base.reducers.paginator';
import { Pessoa } from '../../../models/pessoa';
import * as EmpresaConsignatariaActions from '../actions/empresa-consignataria.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { Banco } from '../../../models/banco';

export const adapter: EntityAdapter<EmpresaConsignataria> = getEntityAdapter<EmpresaConsignataria>();

export interface EmpresaConsignatariaState extends BaseEntityState<EmpresaConsignataria> {
    pessoasJuridicas: Pessoa[];
    bancos: Banco[];
}

export const initialEmpresaConsignatariaState: EmpresaConsignatariaState = initialState(adapter, {
    pessoasJuridicas: undefined,
    bancos: undefined
});

const initEmpresaConsignatariaReducer = createReducer(
    initialEmpresaConsignatariaState,
    on(EmpresaConsignatariaActions.countEmpresaConsignatariaSucesso, (state, {filter, count}) => {
        return {...initialEmpresaConsignatariaState, filter, count,
            pessoasJuridicas: (state as EmpresaConsignatariaState).pessoasJuridicas,
            bancos: (state as EmpresaConsignatariaState).bancos};
    }),
    on(EmpresaConsignatariaActions.countEmpresaConsignatariaErro, (state) => ({...initialEmpresaConsignatariaState})),
    on(EmpresaConsignatariaActions.pesquisarEmpresaConsignatariaSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(EmpresaConsignatariaActions.salvarEmpresaConsignatariaSucesso, (state, {registro, insert}) => {
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(EmpresaConsignatariaActions.atualizarStatusEmpresaConsignatariaSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    }),
    on(EmpresaConsignatariaActions.consultarPessoasJuriticasEmpConsSucesso, (state, {pessoasJuridicas}) => {
        return {...state, pessoasJuridicas };
    }),
    on(EmpresaConsignatariaActions.consultarBancosEmpConsSucesso, (state, {bancos}) => {
        return {...state, bancos};
    })
);

export function empresaConsignatariaReducer(state: EmpresaConsignatariaState | undefined, action: Action) {
    return initEmpresaConsignatariaReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
