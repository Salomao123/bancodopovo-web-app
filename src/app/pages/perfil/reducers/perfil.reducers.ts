import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Perfil } from '../../../models/perfil';
import { createReducer, Action, on } from '@ngrx/store';
import * as PerfilActions from '../actions/perfil.actions';
import { PageQuery, PageQueryRegs, SortMeta } from '../../../util/pagination';

export const adapter: EntityAdapter<Perfil> = createEntityAdapter<Perfil>();

export interface PerfilState extends EntityState<Perfil> {
    filter: Perfil;
    count: number;
    page: PageQuery;
    sort: SortMeta;
    pagesRegs: Array<PageQueryRegs>;
}

export const initialPerfilState: PerfilState = adapter.getInitialState({
    filter: undefined,
    count: 0,
    page: undefined,
    sort: undefined,
    pagesRegs: [],
    entities: []
});

const initPerfilReducer = createReducer(
    initialPerfilState,
    on(PerfilActions.countPerfilSucesso, (state, {filter, count}) => {
        return {...initialPerfilState, filter, count};
    }),
    on(PerfilActions.countPerfilErro, (state) => ({...initialPerfilState})),
    on(PerfilActions.pesquisarPerfilSucesso, (state, {perfis, page, sort}) => {
        const pageReg = {
            page : page.first,
            registros: perfis.map(p => p.id)
        };

        if ((state.sort) && sort.field === state.sort.field && sort.order === state.sort.order) {
            return adapter.addMany(perfis, {...state, page, sort,
                pagesRegs: (state.pagesRegs.find(e => e.page === page.first)) ? [...state.pagesRegs] : [...state.pagesRegs, pageReg]});
        } else {
            return adapter.addAll(perfis, {...state, page, sort, pagesRegs: [pageReg]});
        }
    }),
    on(PerfilActions.salvarPerfilSucesso, (state, {perfil, insert}) => {
        const count = (insert) ? state.count + 1 : state.count; // se for insert aumenta mais um registro no contador
        return adapter.upsertOne(perfil, {...state, count});
    }),
    on(PerfilActions.atualizarStatusPerfilSucesso, (state, {id, status}) => {
        return adapter.updateOne({
            id,
            changes: {...state.entities[id], status}
        }, state);
    })
);

export function perfilReducer(state: PerfilState | undefined, action: Action) {
    return initPerfilReducer(state, action);
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
