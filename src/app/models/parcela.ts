import { SituacaoParcelaEnum } from '../enums/situacao.parcela';
import { StatusRegistroEnum } from '../enums/status.registro';
import { Proposta } from './proposta';

export class Parcela {
    id: number;
    numero: number;
    valor: number;
    valorFormatado: string;
    masAnoFolha: string;
    situacao: SituacaoParcelaEnum;
    status: StatusRegistroEnum;
    justificativa: string;
    proposta: Proposta;
    dataVencimento: Date;
}
