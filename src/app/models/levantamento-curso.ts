import { Usuario } from '../models/usuario';
import { TipoGastoEnum } from '../enums/tipo.gasto';

export class LevantamentoCurso {

    id: number;
    dataCadastro: Date;
    dataAtualizacao: Date;
    usuario: Usuario;
    idLevantamento: number;

    nome: string;
    instituicao: string;

}