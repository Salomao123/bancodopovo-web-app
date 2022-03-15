import { ContatoState } from '../reducers/contato.reducers';
import { createFeatureSelector } from '@ngrx/store';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectContatoState = createFeatureSelector<ContatoState>('contatos');

export const selectContatoCount = baseSelectCount(selectContatoState);

export const selectContatoPageShow = baseSelectPageShow(selectContatoState);
