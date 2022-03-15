import { StatusRegistroEnum } from '../enums/status.registro';
import { Pessoa } from './pessoa';
import { Empresa } from './empresa';
import { EstadoCivilEnum } from '../enums/estado.civil';

export class EmpregadoConsignante {
    id: number;
    version: number;
    rg: string;
    nomeMae: string;
    nomePai: string;
    profissao: string;
    estadoCivil: EstadoCivilEnum;
    nomeConjuge: string;
    matricula: string;
    salario: number;
    margem: number;
    valorMargem: number;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    pessoa: Pessoa;
    empresa: Empresa;
}
