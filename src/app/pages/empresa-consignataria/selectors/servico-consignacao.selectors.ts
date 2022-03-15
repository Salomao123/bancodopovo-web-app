import { createFeatureSelector } from '@ngrx/store';
import { ServicoConsignacaoState } from '../reducers/servico-consignacao.reducers';
import { baseSelectCount, baseSelectPageShow } from '../../base.selectors';

export const selectServicoConsignacaoState = createFeatureSelector<ServicoConsignacaoState>('servicos-consignacao');

export const selectServicoConsignacaoCount = baseSelectCount(selectServicoConsignacaoState);

export const selectServicoConsignacaoPageShow = baseSelectPageShow(selectServicoConsignacaoState);
