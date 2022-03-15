import { Usuario } from '../models/usuario';
import { TipoGastoEnum } from '../enums/tipo.gasto';

export class LevantamentoGastoFamiliar {

    id: number;
    dataCadastro: Date;
    dataAtualizacao: Date;
    usuario: Usuario;
    idLevantamento: number;

    tipo: TipoGastoEnum;
    descricao: string;
    valor: number;
    valorFormatado: string;

}