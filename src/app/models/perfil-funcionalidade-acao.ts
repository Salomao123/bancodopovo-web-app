import { StatusRegistroEnum } from '../enums/status.registro';
import { Perfil } from './perfil';
import { FuncionalidadeAcao } from './funcionalidade-acao';

export class PerfilFuncionalidadeAcao {
    id: number;
    version: number;
    status: StatusRegistroEnum;
    dataCadastro: Date;
    perfil: Perfil;
    funcionalidadeAcao: FuncionalidadeAcao;
}
