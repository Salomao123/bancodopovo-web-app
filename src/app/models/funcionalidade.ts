import { StatusRegistroEnum } from '../enums/status.registro';

export class Funcionalidade {
    id: number;
    nome: string;
    descricao: string;
    status: StatusRegistroEnum;
}