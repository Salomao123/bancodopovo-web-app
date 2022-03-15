import { EntityAdapter } from '@ngrx/entity';
import { Usuario } from '../../../models/usuario';
import { createReducer, Action, on } from '@ngrx/store';
import * as UsuarioActions from '../actions/usuario.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus, upsertOnState } from '../../base.reducers.paginator';
import { Pessoa } from '../../../models/pessoa';
import { EmpresaConsignataria } from '../../../models/empresa-consignataria';
import { Empresa } from '../../../models/empresa';
import { EmpresaEmpregadosConsignantes } from '../../../models/empresa-empregados-consignantes';

export const adapter: EntityAdapter<Usuario> = getEntityAdapter<Usuario>();

export interface UsuarioState extends BaseEntityState<Usuario> {
    pessoasFisicas: Pessoa[];
    empresasConsignatarias: EmpresaConsignataria[];
    empresas: Empresa[];

    empresaSelecionada: number;
    empresasEmpregados: EmpresaEmpregadosConsignantes[];
}

export const initialUsuarioState: UsuarioState = initialState(adapter, {
    pessoasFisicas: undefined,
    empresasConsignatarias: undefined,
    empresas: undefined,
    empresasEmpregados: undefined,
});

const initUsuarioReducer = createReducer(
    initialUsuarioState,
    on(UsuarioActions.countUsuarioSucesso, (state, {filter, count}) => {
        return {...initialUsuarioState, filter, count, pessoasFisicas: (state as UsuarioState).pessoasFisicas};
    }),
    on(UsuarioActions.countUsuarioErro, (state) => ({...initialUsuarioState})),
    on(UsuarioActions.pesquisarUsuarioSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(UsuarioActions.salvarUsuarioSucesso, (state, {registro, insert}) => {
        // const count = (insert) ? state.count + 1 : state.count; // se for insert aumenta mais um registro no contador
        // return adapter.upsertOne(registro, {...state, count});
        return upsertOnState(adapter, state, registro, insert);
    }),
    on(UsuarioActions.atualizarStatusUsuarioSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    }),
    on(UsuarioActions.consultarPessoasFisicasSucesso, (state, {pessoasFisicas}) => {
        return {...state, pessoasFisicas };
    }),
    on(UsuarioActions.consultarEmpresasSucesso, (state, {empresas}) => {
        return {...state, empresas};
    }),
    on(UsuarioActions.consultarEmpresasConsignatariasSucesso, (state, {empresasConsignatarias}) => {
        return {...state, empresasConsignatarias};
    }),
    on(UsuarioActions.consultarEmpregadosConsignantesSucesso, (state, {idEmpresa, empregados}) => {
        let empresasEmpregados = (state as UsuarioState).empresasEmpregados;

        if (empresasEmpregados) {
            const index = empresasEmpregados.findIndex(e => e.idEmpresa === idEmpresa);

            if (index >= 0) {
                empresasEmpregados = Object.assign([], (state as UsuarioState).empresasEmpregados);
                empresasEmpregados[index] = { idEmpresa, empregados };
            } else {
                empresasEmpregados = [...empresasEmpregados, { idEmpresa, empregados }];
            }
        } else {
            empresasEmpregados = [...[], { idEmpresa, empregados }];
        }
        return {...state, empresasEmpregados, empresaSelecionada: idEmpresa};
    })
);

export function usuarioReducer(state: UsuarioState | undefined, action: Action) {
    return initUsuarioReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
