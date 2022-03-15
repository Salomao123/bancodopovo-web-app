import { Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { AccessGuard } from '../../guard/access.guard';

export const SECURE_ROUTES: Routes = [
    {
        path: 'home-consignado',
        loadChildren: './pages/home-consignado/home-consignado.module#HomeConsignadoModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'home-admin',
        loadChildren: './pages/home-admin/home-admin.module#HomeAdminModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'home-consignante',
        loadChildren: './pages/home-consignante/home-consignante.module#HomeConsignanteModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'home-consignatario',
        loadChildren: './pages/home-consignatario/home-consignatario.module#HomeConsignatarioModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'pessoa',
        loadChildren: './pages/pessoa/pessoa.module#PessoaModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'pessoa-documento',
        loadChildren: './pages/pessoa-documento/pessoa-documento.module#PessoaDocumentoModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'empresa',
        loadChildren: './pages/empresa/empresa.module#EmpresaModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'perfil',
        loadChildren: './pages/perfil/perfil.module#PerfilModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'usuario',
        loadChildren: './pages/usuario/usuario.module#UsuarioModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'empresa-consignataria',
        loadChildren: './pages/empresa-consignataria/empresa-consignataria.module#EmpresaConsignatariaModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'empregado-consignante',
        loadChildren: './pages/empregado-consignante/empregado-consignante.module#EmpregadoConsignanteModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'consulta-margem',
        loadChildren: './pages/consulta-margem/consulta-margem.module#ConsultaMargemModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'visualizacao-margem',
        loadChildren: './pages/visualizacao-margem/visualizacao-margem.module#VisualizacaoMargemModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'consulta-convenio',
        loadChildren: './pages/consulta-convenio/consulta-convenio.module#ConsultaConvenioModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'consignacao',
        loadChildren: './pages/consignacao/consignacao.module#ConsignacaoModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'taxas',
        loadChildren: './pages/taxas/taxas.module#TaxasModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'simulacao',
        loadChildren: './pages/simulador/simulador.module#SimuladorModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'extrato',
        loadChildren: './pages/consignacao-extrato/consignacao-extrato.module#ConsignacaoExtratoModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'emprestimos',
        loadChildren: './pages/emprestimos/emprestimos.module#EmprestimosModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'emprestimo-detalhe',
        loadChildren: './pages/emprestimo-detalhe/emprestimo-detalhe.module#EmprestimoDetalheModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'linhas-credito',
        loadChildren: './pages/linhas-credito/linhas-credito.module#LinhasCreditoModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'levantamentos',
        loadChildren: './pages/levantamentos/levantamentos.module#LevantamentosModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'levantamento-novo',
        loadChildren: './pages/levantamento-novo/levantamento-novo.module#LevantamentoNovoModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'visitas',
        loadChildren: './pages/visitas/visitas.module#VisitasModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'eventos',
        loadChildren: './pages/eventos/eventos.module#EventosModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'eventos-participantes',
        loadChildren: './pages/eventos-participantes/eventos-participantes.module#EventosParticipantesModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'parametros',
        loadChildren: './pages/parametros/parametros.module#ParametrosModule',
        canActivate: [AuthGuard, AccessGuard]
    },
    {
        path: 'arquivo-remessa',
        loadChildren: './pages/arquivo-remessa/arquivo-remessa.module#ArquivoRemessaModule',
        canActivate: [AuthGuard, AccessGuard]
    }
];
