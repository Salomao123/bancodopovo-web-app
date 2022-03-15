import { createAction, props } from '@ngrx/store';
import { EmpregadoConsignante } from '../../../models/empregado-consignante';
import { SimulacaoVo } from '../../../vo/simulacao.vo';
import { SimulacaoEmprestimoVo } from '../../../vo/simulacao.emprestimo.vo';

export const recuperarVinculosSimulador = createAction('[Simulador] Recuperar Vinculos');

export const recuperarVinculosSimuladorSucesso = createAction('[Simulador] Recuperar Vinculos Sucesso',
    props<{ empregados: EmpregadoConsignante[] }>());

export const recuperarVinculosSimuladorErro = createAction('[Simulador] Recuperar Vinculos Erro');

export const compararSimulacoesSimulador = createAction('[Simulador] Comparar Simulacoes',
    props<{ empregadoConsignante: number, simulacaoVo: SimulacaoEmprestimoVo }>());

export const compararSimulacoesSimuladorSucesso = createAction('[Simulador] Comparar Simulacoes Sucesso',
    props<{ simulacoes: SimulacaoVo[] }>());

export const compararSimulacoesSimuladorErro = createAction('[Simulador] Comparar Simulacoes Erro');

export const realizarSimulacaoSimulador = createAction('[Simulador] Realizar Simulacao',
    props<{ idServicoConsignacao: number, simulacaoVo: SimulacaoEmprestimoVo, afterSimulacao: () => void }>());

export const realizarSimulacaoSimuladorSucesso = createAction('[Simulador] Realizar Simulacao Sucesso',
    props<{ idServicoConsignacao: number, simulacoes: SimulacaoEmprestimoVo[], afterSimulacao: () => void }>());

export const realizarSimulacaoSimuladorErro = createAction('[Simulador] Realizar Simulacao Erro');

export const limparSimulacoesSimulador = createAction('[Simulador] Limpar Simulacoes');
