import { StatusRegistroEnum } from './../enums/status.registro';
import { Perfil } from './perfil';
import { Usuario } from './usuario';

export class UsuarioPerfil {
    id: number;
    version: number;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    usuario: Usuario;
    perfil: Perfil;
}
