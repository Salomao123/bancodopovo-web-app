import { TipoContatoEnum } from '../enums/tipo.contato';
import { StatusRegistroEnum } from '../enums/status.registro';
import { Pessoa } from './pessoa';

export class Contato {
    id: number;
    version: number;
    tipo: TipoContatoEnum;
    email: string;
    telefone: string;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    pessoa: Pessoa;
}
