import { TipoUsuarioEnum } from '../enums/tipo.usuario';
import { StatusRegistroEnum } from '../enums/status.registro';
import { Pessoa } from './pessoa';
import { EmpresaConsignataria } from './empresa-consignataria';
import { EmpregadoConsignante } from './empregado-consignante';
import { Empresa } from './empresa';

export class Usuario {
    id: number;
    version: number;
    login: string;
    senha: string;
    tipo: TipoUsuarioEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    status: StatusRegistroEnum;
    hashTrocaSenha: string;
    pessoa: Pessoa;
    empresa: Empresa;
    empresaConsignataria: EmpresaConsignataria;
    empregadoConsignante: EmpregadoConsignante;
}
