import { createFeatureSelector } from '@ngrx/store';
import { VisualizacaoMargemState } from '../reducers/visualizacao-margem.reducers';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectVisualizacaoMargemState = createFeatureSelector<VisualizacaoMargemState>('visualizacoes-margens');

export const selectVisualizacaoMargemCount = baseSelectCount(selectVisualizacaoMargemState);

export const selectVisualizacaoMargemPageShow = baseSelectPageShow(selectVisualizacaoMargemState);
