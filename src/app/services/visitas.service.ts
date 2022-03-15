import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { Visita } from '../models/visita';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TipoPessoaEnum } from '../enums/tipo.pessoa';
import { StatusRegistroEnum } from '../enums/status.registro';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class VisitasService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    recuperarPorIdUrl: string;
    atualizarStatusUrl: string;
    recuperarPorTipoStatusUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/visita';
        this.countUrl = Utils.getUrlBackend() + '/api/visita/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/visita/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/visita/';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/visita/atualizarStatus';
        this.recuperarPorTipoStatusUrl = Utils.getUrlBackend() + '/api/visita';
    }

    salvar(visita: Visita) {
        return this.http.post(this.salvarUrl, visita).pipe(
            tap((res: Visita) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: Visita) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Visita>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Visita>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: Visita) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    private tratarDatas(visita: Visita) {
        if (visita.dataCadastro) {
            visita.dataCadastro = new Date(visita.dataCadastro);
        }

        if (visita.dataAtualizacao) {
            visita.dataAtualizacao = new Date(visita.dataAtualizacao);
        }

        if (visita.dataVisita) {
            visita.dataVisita = new Date(visita.dataVisita);
        }

        if (visita.pessoa && visita.pessoa.dataNascimento) {
            visita.pessoa.dataNascimento = new Date(visita.pessoa.dataNascimento);
        }
    }

    atualizarStatus(visita: Visita) {
        return this.http.post(this.atualizarStatusUrl, visita);
    }

    recuperarPorTipoStatus(tipo: TipoPessoaEnum, status: StatusRegistroEnum) {
        return this.http.get(this.recuperarPorTipoStatusUrl + '/tipo/' + tipo + '/status/' + status).pipe(
            tap((res: Array<Visita>) => res)
        );
    }
}
