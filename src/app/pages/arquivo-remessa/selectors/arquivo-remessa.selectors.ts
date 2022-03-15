import { createFeatureSelector } from '@ngrx/store';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';
import { ArquivoRemessaState } from '../reducers/arquivo-remessa.reducers';

export const selectArquivoRemessaState = createFeatureSelector<ArquivoRemessaState>('arquivos-remessa');

export const selectArquivoRemessaCount = baseSelectCount(selectArquivoRemessaState);

export const selectArquivoRemessaPageShow = baseSelectPageShow(selectArquivoRemessaState);
