import { ServicoConsignacao } from '../models/servico-consignacao';
import { SimulacaoEmprestimoVo } from './simulacao.emprestimo.vo';

export class SimulacaoVo {
    servicoConsignacao: ServicoConsignacao;
    simulacoesEmprestimos: SimulacaoEmprestimoVo[];
}
