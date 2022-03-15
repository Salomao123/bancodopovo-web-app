import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { tap } from 'rxjs/operators';
import { PageSort } from '../vo/page.sort';
import { Contato } from '../models/contato';

@Injectable({
    providedIn: 'root'
})
export class ContatoService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    atualizarStatusUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/contato';
        this.countUrl = Utils.getUrlBackend() + '/api/contato/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/contato/pesquisar';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/contato/atualizarStatus';
    }

    salvar(contato: Contato) {
        return this.http.post(this.salvarUrl, contato);
    }

    count(filtro: Contato) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Contato>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Contato>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    atualizarStatus(contato: Contato) {
        return this.http.post(this.atualizarStatusUrl, contato);
    }

    private tratarDatas(contato: Contato) {
        if (contato.dataCadastro) {
            contato.dataCadastro = new Date(contato.dataCadastro);
        }

        if (contato.dataAtualizacao) {
            contato.dataAtualizacao = new Date(contato.dataAtualizacao);
        }
    }
}
