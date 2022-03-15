import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { UsuarioPerfil } from '../models/usuario-perfil';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';
import { Perfil } from '../models/perfil';

@Injectable({
    providedIn: 'root'
})
export class UsuarioPerfilService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    atualizarStatusUrl: string;
    recuperarPerfisNaoVinculadosUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/usuario-perfil';
        this.countUrl = Utils.getUrlBackend() + '/api/usuario-perfil/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/usuario-perfil/pesquisar';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/usuario-perfil/atualizarStatus';
        this.recuperarPerfisNaoVinculadosUrl = Utils.getUrlBackend() + '/api/usuario-perfil/perfis-nao-vinculados/';
    }

    salvar(usuarioPerfil: UsuarioPerfil) {
        return this.http.post(this.salvarUrl, usuarioPerfil);
    }

    count(filtro: UsuarioPerfil) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<UsuarioPerfil>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<UsuarioPerfil>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    atualizarStatus(usuarioPerfil: UsuarioPerfil) {
        return this.http.post(this.atualizarStatusUrl, usuarioPerfil);
    }

    private tratarDatas(usuarioPerfil: UsuarioPerfil) {
        if (usuarioPerfil.dataCadastro) {
            usuarioPerfil.dataCadastro = new Date(usuarioPerfil.dataCadastro);
        }

        if (usuarioPerfil.dataAtualizacao) {
            usuarioPerfil.dataAtualizacao = new Date(usuarioPerfil.dataAtualizacao);
        }
    }

    recuperarPerfisNaoVinculados(idUsuario: number) {
        return this.http.get(this.recuperarPerfisNaoVinculadosUrl + idUsuario).pipe(
            tap((res: Array<Perfil>) => res)
        );
    }
}
