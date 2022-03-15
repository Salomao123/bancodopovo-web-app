import { StatusRegistroEnum } from '../enums/status.registro';
import { Pessoa } from './pessoa';
import { Cidade } from './cidade';

export class Endereco {
    id: number;
    version: number;
    logradouro: string;
    bairro: string;
    numero: string;
    complemento: string;
    cep: string;
    dataCadastro: Date;
    dataAtualizacao: Date;
    status: StatusRegistroEnum;
    pessoa: Pessoa;
    cidade: Cidade;
}
