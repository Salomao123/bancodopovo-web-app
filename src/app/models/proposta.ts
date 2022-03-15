import { ServicoConsignacao } from './servico-consignacao';
import { EmpregadoConsignante } from './empregado-consignante';
import { Usuario } from './usuario';
import { SituacaoPropostaEnum } from '../enums/situacao.proposta';
import { SimNaoEnum } from '../enums/sim.nao';

export class Proposta {
    id: number;
    version: number;
    situacao: SituacaoPropostaEnum;
    dataCadastro: Date;
    parcelas: number;
    valorParcela: number;
    identificacaoContrato: string;
    documento: string;
    nomeDocumento: string;
    mesAnoInicio: string;
    mesAnoFim: string;
    suspensaoJustificativa: string;
    suspensaoComBloqueio: SimNaoEnum;
    cancelamentoSuspensaoJustificativa: string;
    servicoConsignacao: ServicoConsignacao;
    empregadoConsignante: EmpregadoConsignante;
    usuarioConsignatario: Usuario;
}
