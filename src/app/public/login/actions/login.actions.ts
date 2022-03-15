import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../../models/usuario';
import { UsuarioLogin } from '../../../models/usuario.login';
import { TipoUsuarioEnum } from '../../../enums/tipo.usuario';
import { NovaSenhaVo } from '../../../vo/nova-senha.vo';

export const efetuarLoginAction = createAction(
    '[Login] Efetuar Login Action',
    props<{usuarioLogin: UsuarioLogin, tipoUsuario: TipoUsuarioEnum}>()
);

export const efetuarLoginSuccessAction = createAction(
    '[Login] Efetuar Login Success Action',
    props<{usuario: Usuario, fs: any}>()
);

export const carregarDadosLoginSuccessAction = createAction(
    '[Login] Carregar Dados Login Success Action',
    props<{usuario: Usuario, fs: any}>()
);

export const efetuarLoginErrorAction = createAction(
    '[Login] Efetuar Login Error Action',
    props<{error: any}>()
);

export const efetuarLogoutAction = createAction(
    '[Logout] Efetuar Logout Action'
);

export const efetuarLogoutSuccessAction = createAction(
    '[Logout] Efetuar Logout Success Action'
);

export const alterarSenhaAction = createAction(
    '[Senha] Alterar Action',
    props<{ novaSenhaVo: NovaSenhaVo }>()
);

export const esqueciSenhaAction = createAction(
    '[Senha] Esqueci Action',
    props<{ tipo: number }>()
);

export const solicitarTrocaSenhaAction = createAction(
    '[Senha] Solicitar Troca Action',
    props<{ email: string }>()
);

export const selecionarFuncionalidadeAction = createAction(
    '[Menu] Selecionar Funcionalidade',
    props<{ factive: number, fname: string }>()
);