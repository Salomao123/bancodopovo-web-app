import { createAction, props } from '@ngrx/store';
import { EmpregadoConsignante } from '../../../models/empregado-consignante';
import { Proposta } from '../../../models/proposta';
import { Parcela } from '../../../models/parcela';

export const recuperarVinculosConsignacaoExtrato = createAction('[Consignacao Extrato] Recuperar Vinculos');

export const recuperarVinculosConsignacaoExtratoSucesso = createAction('[Consignacao Extrato] Recuperar Vinculos Sucesso',
    props<{ consignados: EmpregadoConsignante[] }>());

export const recuperarVinculosConsignacaoExtratoErro = createAction('[Consignacao Extrato] Recuperar Vinculos Erro');

export const recuperarPropostasConsignacaoExtrato = createAction('[Consignacao Extrato] Recuperar Propostas',
    props<{ consignadoSelecionado: number, after: () => void }>());

export const recuperarPropostasConsignacaoExtratoSucesso = createAction('[Consignacao Extrato] Recuperar Propostas Sucesso',
    props<{ propostas: Proposta[], after: () => void }>());

export const recuperarPropostasConsignacaoExtratoErro = createAction('[Consignacao Extrato] Recuperar Propostas Erro');

export const recuperarParcelasPropostasConsignacaoExtrato = createAction('[Consignacao Extrato] Recuperar Parcelas Propostas',
    props<{ idProposta: number, after: () => void }>());

export const recuperarParcelasPropostasConsignacaoExtratoSucesso = createAction(
    '[Consignacao Extrato] Recuperar Parcelas Propostas Sucesso',
    props<{ parcelas: Parcela[], after: () => void }>());

export const recuperarParcelasPropostasConsignacaoExtratoErro = createAction('[Consignacao Extrato] Recuperar Parcelas Propostas Erro');
