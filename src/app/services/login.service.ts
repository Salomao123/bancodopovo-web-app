import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { HttpClient, HttpHeaders, HttpBackend } from '@angular/common/http';
import { UsuarioLogin } from '../models/usuario.login';
import { map, tap } from 'rxjs/operators';
import { TipoUsuarioEnum } from '../enums/tipo.usuario';
import { TokenUser } from '../models/token.user';
import { NovaSenhaVo } from '../vo/nova-senha.vo';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private http: HttpClient;
    private loginUrl: string;
    private alterarSenhaUrl: string;
    private solicitarTrocaUrl: string;

    constructor(private handler: HttpBackend) {
        this.http = new HttpClient(handler);
        this.loginUrl = Utils.getUrlBackend() + '/oauth/token';
        this.alterarSenhaUrl = Utils.getUrlBackend() + '/api-public/senha/alterar';
        this.solicitarTrocaUrl = Utils.getUrlBackend() + '/api-public/senha/solicitar-troca';
    }

    login(usuarioLogin: UsuarioLogin, tipoUsuario: TipoUsuarioEnum) {
        const password = encodeURIComponent(usuarioLogin.senha);

        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa('front-web:1234')
        });

        const formData: FormData = new FormData();
        formData.append('grant_type', 'password');
        formData.append('username', usuarioLogin.login);
        formData.append('password', password);
        formData.append('user_type', tipoUsuario.toString());

        return this.http.post(this.loginUrl, formData, { headers });
    }

    novoAccessToken() {
        const refreshToken = localStorage.getItem('cng_rt');

        const headers = new HttpHeaders({
            Authorization: 'Basic ' + btoa('front-web:1234')
        });

        const formData: FormData = new FormData();
        formData.append('grant_type', 'refresh_token');
        formData.append('refresh_token', refreshToken);

        return this.http.post(this.loginUrl, formData, { headers }).pipe(
            map(res => res as TokenUser)
        );
    }

    alterarSenha(novaSenhaVo: NovaSenhaVo) {
        return this.http.post(this.alterarSenhaUrl, novaSenhaVo).pipe(
            tap((res: number) => res)
        );
    }

    solicitarTrocaSenha(usuario: Usuario) {
        return this.http.post(this.solicitarTrocaUrl, usuario);
    }
}
