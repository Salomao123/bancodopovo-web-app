import { Convenio } from '../models/convenio';
import { ServicoConsignacao } from '../models/servico-consignacao';
import { Representante } from '../models/representante';
import { Endereco } from '../models/endereco';
import { Contato } from '../models/contato';

export class ConvenioVo {
    convenio: Convenio;
    servicos: ServicoConsignacao[];
    representantes: Representante[];
    enderecos: Endereco[];
    contatos: Contato[];
}
