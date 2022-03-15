import { StatusRegistroEnum } from '../enums/status.registro';

export class Perfil {
    id: number;
    version: number;
    nome: string;
    descricao: string;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
}
