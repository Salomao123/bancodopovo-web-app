import { Usuario } from '../models/usuario';
import { TipoGastoEnum } from '../enums/tipo.gasto';

export class LevantamentoExperienciaProfissional {

    id: number;
    dataCadastro: Date;
    dataAtualizacao: Date;
    usuario: Usuario;
    idLevantamento: number;

    localTrabalho: string;
    meses: number;
    funcao: string;

}