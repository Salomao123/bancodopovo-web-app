import { EntityAdapter } from '@ngrx/entity';
import { UsuarioPerfil } from '../../../models/usuario-perfil';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus } from '../../base.reducers.paginator';
import { createReducer, on, Action } from '@ngrx/store';
import * as UsuarioPerfilActions from '../actions/usuario-perfil.action';
import { Perfil } from '../../../models/perfil';

export const adapter: EntityAdapter<UsuarioPerfil> = getEntityAdapter<UsuarioPerfil>();

export interface UsuarioPerfilState extends BaseEntityState<UsuarioPerfil> {
    perfis: Perfil[];
}

export const initialUsuarioPerfilState: UsuarioPerfilState = initialState(adapter, {
    perfis: undefined
});

const initUsuarioPerfilReducer = createReducer(
    initialUsuarioPerfilState,
    on(UsuarioPerfilActions.countUsuarioPerfilSucesso, (state, {filter, count}) => {
        return {...initialUsuarioPerfilState, filter, count, perfis: (state as UsuarioPerfilState).perfis};
    }),
    on(UsuarioPerfilActions.countUsuarioPerfilErro, (state) => ({...initialUsuarioPerfilState})),
    on(UsuarioPerfilActions.pesquisarUsuarioPerfilSucesso, (state, {registros, page, sort}) => {
        return loadRegsOnState(adapter, state, page, sort, registros);
    }),
    on(UsuarioPerfilActions.salvarUsuarioPerfilSucesso, (state, {registro, insert}) => {
        // limpar acoes
        const newPerfis = (state as UsuarioPerfilState).perfis.filter(p => p.id !== registro.perfil.id);

        const count = (insert) ? state.count + 1 : state.count; // se for insert aumenta mais um registro no contador
        return adapter.upsertOne(registro, {...state, count, perfis: newPerfis});
    }),
    on(UsuarioPerfilActions.atualizarStatusUsuarioPerfilSucesso, (state, {id, status}) => {
        return updateRegStatus(adapter, state, id, status);
    }),
    on(UsuarioPerfilActions.recuperarPerfisAtivosSucesso, (state, {perfis}) => {
        return {...state, perfis };
    })
);

export function usuarioPerfilReducer(state: UsuarioPerfilState | undefined, action: Action) {
    return initUsuarioPerfilReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
