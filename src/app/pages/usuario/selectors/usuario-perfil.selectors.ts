import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsuarioPerfilState } from '../reducers/usuario-perfil.reducers';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectUsuarioPerfilState = createFeatureSelector<UsuarioPerfilState>('usuarios-perfis');

export const selectUsuarioPerfilCount = baseSelectCount(selectUsuarioPerfilState);

export const selectUsuarioPerfilPageShow = baseSelectPageShow(selectUsuarioPerfilState);

export const selectPerfilAtivo = (idPerfil: number) => createSelector(
    selectUsuarioPerfilState,
    state => {
        const perfis = state.perfis.filter(p => p.id === idPerfil);
        return (perfis) ? perfis[0] : undefined;
    }
);

export const selectPerfisAtivos = createSelector(
    selectUsuarioPerfilState,
    state => state.perfis
);
