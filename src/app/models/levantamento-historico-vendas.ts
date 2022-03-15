import { Usuario } from '../models/usuario';
import { ConceitoVendaEnum } from '../enums/conceito.venda';

export class LevantamentoHistoricoVendas {

    id: number;
    dataCadastro: Date;
    dataAtualizacao: Date;
    usuario: Usuario;
    idLevantamento: number;

    mesAno: string;
    valor: number;
    valorFormatado: string;
    conceitoVenda: ConceitoVendaEnum;

}