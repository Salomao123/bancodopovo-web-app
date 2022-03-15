import { EntityAdapter } from '@ngrx/entity';
import { Emprestimo } from '../../../models/emprestimo';
import { createReducer, Action, on } from '@ngrx/store';
import * as EmprestimoDetalheActions from '../actions/emprestimo-detalhe.action';
import { getEntityAdapter, BaseEntityState, initialState, loadRegsOnState, updateRegStatus, upsertOnState } from '../../base.reducers.paginator';

export const adapter: EntityAdapter<Emprestimo> = getEntityAdapter<Emprestimo>();

export interface EmprestimoDetalheState extends BaseEntityState<Emprestimo> {}

export const initialEmprestimoDetalheState: EmprestimoDetalheState = initialState(adapter, {});


