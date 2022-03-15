import { StatusRegistroEnum } from '../enums/status.registro';
import { EmpresaConsignataria } from './empresa-consignataria';
import { Pessoa } from './pessoa';
import { Contato } from './contato';

export class Representante {
    id: number;
    version: number;
    cargo: string;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    empresaConsignataria: EmpresaConsignataria;
    pessoa: Pessoa;
    contatos: Contato[];
}
