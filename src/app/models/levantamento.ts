import { StatusLevantamentoEnum } from '../enums/status.levantamento';
import { Pessoa } from '../models/pessoa';
import { Usuario } from '../models/usuario';
import { ExperienciaProfissionalEnum } from '../enums/experiencia.profissional';
import { AtividadeEnum } from '../enums/atividade';
import { ComunicadoClienteEnum } from '../enums/comunicado.cliente';
import { ImpostoEnum } from '../enums/imposto';
import { LocalEnum } from '../enums/local';
import { PontoEnum } from '../enums/ponto';
import { TipoGastoEnum } from '../enums/tipo.gasto';
import { TipoNegocioEnum } from '../enums/tipo.negocio';
import { TipoRendaEnum } from '../enums/tipo.renda';
import { LevantamentoRendaFamiliar } from '../models/levantamento-renda-familiar';
import { LevantamentoGastoFamiliar } from '../models/levantamento-gasto-familiar';
import { LevantamentoExperienciaProfissional } from '../models/levantamento-experiencia-profissional';
import { LevantamentoCurso } from '../models/levantamento-curso';
import { LevantamentoReceita } from '../models/levantamento-receita';
import { LevantamentoCusto } from '../models/levantamento-custo';
import { LevantamentoCliente } from '../models/levantamento-cliente';
import { LevantamentoFornecedor } from '../models/levantamento-fornecedor';
import { LevantamentoHistoricoVendas } from '../models/levantamento-historico-vendas';
import { LinhaCredito } from '../models/linha-credito';

export class Levantamento {

    id: number;
	status: StatusLevantamentoEnum;
    dataCadastro: Date;
    dataAtualizacao: Date;
    dataLevantamento: Date;

    nome: String;

    usuario: Usuario;
    pessoa: Pessoa;
    avalistaPessoa: Pessoa;

    grau: ExperienciaProfissionalEnum;
    cursoSuperior: string;

    capacidadeInstaladaMensal: string;
    atividade: AtividadeEnum;
    experienciaMeses: number;
    independenciaAtividadeMeses: number; 
    comunicadoCliente: ComunicadoClienteEnum;
    imposto: ImpostoEnum;
    local: LocalEnum;
    dataTermino: Date;
    ponto: PontoEnum;
    tipoControleFormal: number;
    tipoControleLivroCaixa: number;
    tipoControleEstoque: number;
    tipoControleReceber: number;
    tipoControleReceitas: number;
    tipoControlePagar: number;
    tipoControleCaderno: number;
    tipoGasto: TipoGastoEnum;
    tipoNegocio: TipoNegocioEnum;
    tipoRenda: TipoRendaEnum;
    historicoEmpreendimento: string;

    sistemaOrganizacao: string;

    gastoTransporteSemVendas: number;
    gastoTransporteSemVendasFormatado: string;
    comissaoVendas: number;
    comissaoVendasFormatada: string;
    outrosGastos: number;
    outrosGastosFormatado: string;

    totalGastosFormatado: string;

    aluguelTaxaCondominio: number;
    aluguelTaxaCondominioFormatado: string;
    maoObraTrabalhista: number;
    maoObraTrabalhistaFormatada: string;
    maoObraTrabalhistaEncargos: number;
    maoObraTrabalhistaEncargosFormatada: string;
    maoObraSemCustoTrabalhista: number;
    maoObraSemCustoTrabalhistaFormatada: string;
    aguaLuzTelefone: number;
    aguaLuzTelefoneFormatado: string;
    veiculoTransporte: number;
    veiculoTransporteFormatado: string;
    contador: number;
    contadorFormatado: string;
    prolabore: number;
    prolaboreFormatado: string;
    manutencao: number;
    manutencaoFormatado: string;
    subtotalCustos: number;
    subtotalCustosFormatado: string;
    reservaEmergencia: number;
    reservaEmergenciaFormatada: string;
    totalCustos: number;
    totalCustosFormatado: string;

    avalista: string;
    admissao: string;
    outroTipoRenda: string;
    rendaAvalistaMensal: number;
    rendaAvalistaMensalFormatada: string;

    receitasOperacionaisDemonstrativo: number;
    receitasOperacionaisDemonstrativoFormatada: string;
    custosVariaveisDemonstrativo: number;
    custosVariaveisDemonstrativoFormatada: string;
    margemContribuicaoDemonstrativo: number;
    margemContribuicaoDemonstrativoFormatada: string;
    custosFixosDemonstrativo: number;
    custosFixosDemonstrativoFormatada: string;
    resultadoOperacionalDemonstrativo: number;
    resultadoOperacionalDemonstrativoFormatado: string;

    resultadoOperacionalCapacidade: number;
    resultadoOperacionalCapacidadeFormatado: string;
    amortizacaoDividaCapacidade: number;
    amortizacaoDividaCapacidadeFormatada: string;
    disponibilidadeCapacidade: number;
    disponibilidadeCapacidadeFormatada: string;
    pagamentoMensalCapacidade: number;
    pagamentoMensalCapacidadeFormatado: string;
    prestacaoEmprestimoCapacidade: number;
    prestacaoEmprestimoCapacidadeFormatada: string;

    saldoFamiliarMensal: number;
    saldoFamiliarMensalFormatado: string;
    creditoMaximoCompativel: number;
    creditoMaximoCompativelFormatado: string;
    capacidadePagamentoAvalista: number;
    capacidadePagamentoAvalistaFormatada: string;

    atendimentoCreditoPrograma: string;
    dadosCadastrais: string;
    garantias: string;
    historicosInstituicao: string;
    documentacao: string;
    socios: string;
    observacoesDadosGerais: string;

    considerecoesConcorrencia: string;

    credor: string;
    valorPrestacao: number;
    valorPrestacaoFormatado: string;
    numeroPrestacao: number;
    possuiDivida: number;
    valorDivida: number;
    valorDividaFormatada: string;

    qtdFamiliarComCarteiraAssinada: number;
    salarioFamiliarComCarteiraAssinada: number;
    salarioFamiliarComCarteiraAssinadaFormatado: string;
    qtdFamiliarSemCarteiraAssinada: number;
    salarioFamiliarSemCarteiraAssinada: number;
    salarioFamiliarSemCarteiraAssinadaFormatado: string;

    qtdNaoFamiliarComCarteiraAssinada: number;
    salarioNaoFamiliarComCarteiraAssinada: number;
    salarioNaoFamiliarComCarteiraAssinadaFormatado: string;
    qtdNaoFamiliarSemCarteiraAssinada: number;
    salarioNaoFamiliarSemCarteiraAssinada: number;
    salarioNaoFamiliarSemCarteiraAssinadaFormatado: string;

    percentualCompraVista: number;
    percentualCompraPrazo: number;
    operacaoTaxaJuros: number;
    operacaoDiasPrazo: number;
    operacaoDocumentacao: string;
    prejuizos: number;
    prejuizosFormatado: string;

    capitalSoclicitadoParecerAgente: string;
    condicoesNegocioParecerAgente: string;
    capacidadePagamentoParecerAgente: string;
    finalidadeCreditoParecerAgente: string;
    taxaJurosParecerAgente: number;
    taxaJurosParecerAgenteFormatado: string;
    creditoSugeridoParecerAgente: number;
    creditoSugeridoParecerAgenteFormatado: string;
    valorParcelaParecerAgente: number;
    valorParcelaParecerAgenteFormatado: string;
    qtdParcelasParecerAgente: number;
    //valorParcelaParecerAgente: number;
    taxaBoletoParecerAgente: number;
    taxaBoletoParecerAgenteFormatado: string;
    valorFinalParcelaParecerAgente: number;
    valorFinalParcelaParecerAgenteFormatado: string;
    valorTotalParecerAgente: number;
    valorTotalParecerAgenteFormatado: string;

    creditoAprovadoParecerComite: number;
    creditoAprovadoParecerComiteFormatado: string;
    parcelaAprovadaParecerComite: number;
    parcelaAprovadaParecerComiteFormatada: string;
    totalReceberParecerComite: number;
    totalReceberParecerComiteFormatado: string;
    carenciaParecerComite: string;
    vencimentoParcelasParecerComite: string;
    creditoNegadoMotivoParecerComite: string;
    comunicadoClienteParecerComite: ComunicadoClienteEnum;
    dataComunicado: Date;
    providenciaClienteParecerComite: string;

    rendaFamiliar: Array<LevantamentoRendaFamiliar>;
    clientes: Array<LevantamentoCliente>;
    cursos: Array<LevantamentoCurso>;
    custos: Array<LevantamentoCusto>;
    experiencias: Array<LevantamentoExperienciaProfissional>;
    fornecedores: Array<LevantamentoFornecedor>;
    gastos: Array<LevantamentoGastoFamiliar>;
    historicoVendas: Array<LevantamentoHistoricoVendas>;
    receitas: Array<LevantamentoReceita>;

    idEmprestimo: number;

    taxaMaxima: number;
    taxaMinima: number;
    valorMinimo: number;
    valorMaximo: number;

    qtdParcelas: number;

    linhaCredito: LinhaCredito;
    idLinhaCredito: number;

    getDescricaoExperiencia() {
        var descricao = '';
        if (this.grau != null) {
            if (this.grau == ExperienciaProfissionalEnum.FUNDAMENTAL) {
                descricao = 'Fundamental';
            } else if (this.grau == ExperienciaProfissionalEnum.MEDIO) {
                descricao = 'Médio';
            } else if (this.grau == ExperienciaProfissionalEnum.SUPERIOR) {
                descricao = 'Superior';
            }
        }
        return descricao;
    }

}