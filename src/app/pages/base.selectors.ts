import { createSelector, Selector } from '@ngrx/store';
import { PageQuery, SortMeta } from '../util/pagination';

export const baseSelectFilter = <State, S1, Result>(s1: Selector<State, S1>) =>
    createSelector(
        s1, state =>
        (state as any).filter
    );

export const baseSelectCount = <State, S1, Result>(s1: Selector<State, S1>) =>
    createSelector(
        s1, state =>
        (state as any).count
    );

export const baseSelectPageRegs = <State, S1, Result>(s1: Selector<State, S1>, page: PageQuery) =>
    createSelector(
        s1, state => {
            const pageRequest = (page) ? page : (state as any).page;
            const pageReg = (state as any).pagesRegs.filter(pr => pr.page === pageRequest.first);
            return (pageReg.length > 0) ? pageReg[0] : undefined;
        }
    );

export const baseSelectPageShow = <State, S1, Result>(s1: Selector<State, S1>) =>
    createSelector(
        s1,
        baseSelectPageRegs(s1, undefined),
        (state, pageReg) => {
            return (pageReg) ? pageReg.registros.map(id => (state as any).entities[id]) : [];
        }
    );

export const baseSelectPage = <State, S1, Result>(s1: Selector<State, S1>, page: PageQuery, sort: SortMeta) =>
    createSelector(
        s1,
        baseSelectPageRegs(s1, page),
        (state, pageReg) => {
            if (((state as any).sort) && sort.field === (state as any).sort.field && sort.order === (state as any).sort.order) {
                return (pageReg) ? pageReg.registros.map(id => (state as any).entities[id]) : [];
            } else {
                return [];
            }
        }
    );