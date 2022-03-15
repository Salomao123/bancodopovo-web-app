import { createAction, props } from '@ngrx/store';
import { ServicoConsignacaoParcela } from '../../../models/servico-consignacao-parcela';
import { ServicoConsignacao } from '../../../models/servico-consignacao';

export const carregarParcelasTaxasParcelas = createAction('[Taxas Parcelas] Carregar Parcelas',
    props<{ parcelas: ServicoConsignacaoParcela[], afterCarregar: () => void }>());

export const selecionarParcelaTaxaParcelas = createAction('[Taxas Parcelas] Selecionar Parcela',
    props<{ idParcela: number, selecionado: boolean }>());

export const selecionarParcelasTaxasParcelas = createAction('[Taxas Parcelas] Selecionar Parcelas',
    props<{ idsParcelas: number[], selecionado: boolean }>());

export const selecionarTodasParcelasTaxas = createAction('[Taxas Parcelas] Selecionar Todas',
    props<{ selecionado: boolean }>());

export const carregarJurosEncargosTaxasParcelas = createAction('[Taxas Parcelas] Carregar Juros',
    props<{ juros: number, encargos: number }>());

export const carregarJurosEncargosTaxasParcelasSucesso = createAction('[Taxas Parcelas] Carregar Juros Sucesso',
    props<{ parcelas: ServicoConsignacaoParcela[] }>());

export const atualizarParcelasTaxasParcelas = createAction('[Taxas Parcelas] Atualizar Parcelas',
    props<{ afterSalvar: () => void }>());

export const atualizarParcelasTaxasParcelasSucesso = createAction('[Taxas Parcelas] Atualizar Parcelas Sucesso',
    props<{ parcelas: ServicoConsignacaoParcela[], afterSalvar: () => void }>());

export const atualizarParcelasTaxasParcelasErro = createAction('[Taxas Parcelas] Atualizar Parcelas Erro');
