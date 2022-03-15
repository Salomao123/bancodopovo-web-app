import { StatusRegistroEnum } from '../enums/status.registro';
import { EmpresaConsignataria } from './empresa-consignataria';

export class ServicoConsignacao {
    id: number;
    version: number;
    descricao: string;
    codigoDesconto: number;
    nomeDesconto: string;
    prazoMaximoMeses: string;
    juros: number;
    encargos: number;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    empresaConsignataria: EmpresaConsignataria;
}
