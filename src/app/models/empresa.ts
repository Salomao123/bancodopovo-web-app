import { StatusRegistroEnum } from '../enums/status.registro';
import { Pessoa } from './pessoa';
export class Empresa {
    id: number;
    version: number;
    nome: string;
    descricao: string;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    pessoa: Pessoa;
}
