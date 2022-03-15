import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../../models/usuario';
import { PageQuery, SortMeta } from '../../../util/pagination';
import { StatusRegistroEnum } from '../../../enums/status.registro';
import { Pessoa } from '../../../models/pessoa';
import { EmpresaConsignataria } from '../../../models/empresa-consignataria';
import { Empresa } from '../../../models/empresa';
import { EmpregadoConsignante } from '../../../models/empregado-consignante';

export const countUsuario = createAction('[Usuario] Count',
    props<{ filter: Usuario, afterCount: () => void }>());

export const countUsuarioSucesso = createAction('[Usuario] Count Sucesso',
    props<{ filter: Usuario, count: number, afterCount: () => void }>());

export const countUsuarioErro = createAction('[Usuario] Count Erro');

export const pesquisarUsuario = createAction('[Usuario] Pesquisar',
    props<{ page: PageQuery, sort: SortMeta }>());

export const pesquisarUsuarioSucesso = createAction('[Usuario] Pesquisar Sucesso',
    props<{ registros: Usuario[], page: PageQuery, sort: SortMeta }>());

export const pesquisarUsuarioErro = createAction('[Usuario] Pesquisar Erro');

export const salvarUsuario = createAction('[Usuario] Salvar',
    props<{ registro: Usuario, afterSave: () => void }>());

export const salvarUsuarioSucesso = createAction('[Usuario] Salvar Sucesso',
    props<{ registro: Usuario, insert: boolean }>());

export const atualizarStatusUsuario = createAction('[Usuario] Atualizar Status',
    props<{ id: number, status: StatusRegistroEnum }>());

export const atualizarStatusUsuarioSucesso = createAction('[Usuario] Atualizar Status Sucesso',
    props<{ id: number, status: StatusRegistroEnum }>());

export const consultarPessoasFisicas = createAction('[Usuario] Consultar Pessoas Fisicas');

export const consultarPessoasFisicasSucesso = createAction('[Usuario] Consultar Pessoas Fisicas Sucesso',
    props<{ pessoasFisicas: Array<Pessoa> }>());

export const consultarEmpresasConsignatarias = createAction('[Usuario] Consultar Empresas Consignatarias');

export const consultarEmpresasConsignatariasSucesso = createAction('[Usuario] Consultar Empresas Consignatarias Sucesso',
    props<{ empresasConsignatarias: Array<EmpresaConsignataria> }>());

export const consultarEmpresas = createAction('[Usuario] Consultar Empresas');

export const consultarEmpresasSucesso = createAction('[Usuario] Consultar Empresas Sucesso',
    props<{ empresas: Array<Empresa> }>());

export const consultarEmpregadosConsignantes = createAction('[Usuario] Consultar Empregados Consignantes',
    props<{ idEmpresa: number }>());

export const consultarEmpregadosConsignantesSucesso = createAction('[Usuario] Consultar Empregados Consignantes Sucesso',
    props<{ idEmpresa: number, empregados: Array<EmpregadoConsignante> }>());

export const carregarDependenciasParaSalvarUsuario = createAction('[Usuario] Carregar Dependencias Para Salvar',
    props<{ registro: Usuario, afterSave: () => void }>());

export const recuperarPorIdUsuario = createAction('[Usuario] Recuperar Por ID',
    props<{ id: number, afterConsulta: (usuario: Usuario) => void }>());

export const recuperarPorIdUsuarioSucesso = createAction('[Usuario] Recuperar Por ID Sucesso',
    props<{ usuario: Usuario, afterConsulta: (usuario: Usuario) => void }>());

export const enviarEmailCadastro = createAction('[Usuario] Enviar Email de Cadastro',
    props<{ idUsuario: number }>());
