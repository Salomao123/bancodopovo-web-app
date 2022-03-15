import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private recuperarDadosUsuarioUrl: string;

    private salvarUrl: string;
    private countUrl: string;
    private pesquisarUrl: string;
    private atualizarStatusUrl: string;
    private recuperarPorIdUrl: string;
    private emailCadastroUrl: string;

    constructor(private http: HttpClient) {
        this.recuperarDadosUsuarioUrl = Utils.getUrlBackend() + '/api/usuario/logado';

        this.salvarUrl = Utils.getUrlBackend() + '/api/usuario';
        this.countUrl = Utils.getUrlBackend() + '/api/usuario/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/usuario/pesquisar';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/usuario/atualizarStatus';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/usuario/';
        this.emailCadastroUrl = Utils.getUrlBackend() + '/api/usuario/email-cadastro';
    }

    recuperarDadosUsuario() {
        return this.http.get(this.recuperarDadosUsuarioUrl).pipe(
            tap((res: Usuario) => res)
        );
    }

    salvar(usuario: Usuario) {
        return this.http.post(this.salvarUrl, usuario).pipe(
            tap((res: Usuario) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: Usuario) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Usuario>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Usuario>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    atualizarStatus(usuario: Usuario) {
        return this.http.post(this.atualizarStatusUrl, usuario);
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: Usuario) => this.tratarDatas(res))
        );
    }

    emailCadastro(usuario: Usuario) {
        return this.http.post(this.emailCadastroUrl, usuario);
    }

    private tratarDatas(usuario: Usuario) {
        if (usuario.dataCadastro) {
            usuario.dataCadastro = new Date(usuario.dataCadastro);
        }

        if (usuario.dataAtualizacao) {
            usuario.dataAtualizacao = new Date(usuario.dataAtualizacao);
        }
    }
}
