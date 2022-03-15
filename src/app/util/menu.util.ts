import { FuncionalidadeEnum } from '../enums/funcionalidade';

export class MenuUtil {

    static menus = [
        {
            nome: 'Pessoa',
            nomeMenu: 'Pessoa',
            funcionalidade: FuncionalidadeEnum.PESSOA,
            link: '/pages/pessoa',
            icone: 'fa-address-card'
        },
        {
            nome: 'Empresa',
            nomeMenu: 'Empresa',
            funcionalidade: FuncionalidadeEnum.EMPRESA_ORGAO,
            link: '/pages/empresa',
            icone: 'fa-university'
        },
        {
            nome: 'Perfil',
            nomeMenu: 'Perfil de Usuário',
            funcionalidade: FuncionalidadeEnum.PERFIL_USUARIO,
            link: '/pages/perfil',
            icone: 'fa-users'
        },
        {
            nome: 'Usuário',
            nomeMenu: 'Usuário',
            funcionalidade: FuncionalidadeEnum.USUARIO,
            link: '/pages/usuario',
            icone: 'fa-user'
        },
        {
            nome: 'Eventos',
            nomeMenu: 'Eventos/Palestras',
            funcionalidade: FuncionalidadeEnum.EVENTOS,
            link: '/pages/eventos',
            icone: 'fa-microphone'
        },
        {
            nome: 'Levantamentos',
            nomeMenu: 'Levantamentos',
            funcionalidade: FuncionalidadeEnum.LEVANTAMENTOS,
            link: '/pages/levantamentos',
            icone: 'fa-line-chart'
        },
        {
            nome: 'Linhas de Crédito',
            nomeMenu: 'Linhas de Crédito',
            funcionalidade: FuncionalidadeEnum.LINHA_CREDITO,
            link: '/pages/linhas-credito',
            icone: 'fa-dollar'
        },
        {
            nome: 'Empréstimos',
            nomeMenu: 'Empréstimos',
            funcionalidade: FuncionalidadeEnum.EMPRESTIMOS,
            link: '/pages/emprestimos',
            icone: 'fa-dollar'
        },
        {
            nome: 'Visitas',
            nomeMenu: 'Visitas',
            funcionalidade: FuncionalidadeEnum.VISITAS,
            link: '/pages/visitas',
            icone: 'fa-calendar-check-o'
        },
        {
            nome: 'Parâmetros',
            nomeMenu: 'Parâmetros',
            funcionalidade: FuncionalidadeEnum.PARAMETRO,
            link: '/pages/parametros',
            icone: 'fa-gears'
        },
        {
            nome: 'Arquivo de Remessa',
            nomeMenu: 'Arquivo de Remessa',
            funcionalidade: FuncionalidadeEnum.ARQUIVO_REMESSA,
            link: '/pages/arquivo-remessa',
            icone: 'fa-file'
        },
    ];

}
