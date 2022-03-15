import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { Evento } from '../models/evento';
import { Participante } from '../models/participante';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TipoPessoaEnum } from '../enums/tipo.pessoa';
import { StatusRegistroEnum } from '../enums/status.registro';
import { PageSort } from '../vo/page.sort';

@Injectable({
    providedIn: 'root'
})
export class EventosService {

    salvarUrl: string;
    countUrl: string;
    pesquisarUrl: string;
    recuperarPorIdUrl: string;
    atualizarStatusUrl: string;
    recuperarPorTipoStatusUrl: string;
    salvarParticipanteUrl: string;
    excluirParticipanteUrl: string;
    countParticipanteUrl: string;
    pesquisarParticipanteUrl: string;

    constructor(private http: HttpClient) {
        this.salvarUrl = Utils.getUrlBackend() + '/api/evento';
        this.countUrl = Utils.getUrlBackend() + '/api/evento/count';
        this.pesquisarUrl = Utils.getUrlBackend() + '/api/evento/pesquisar';
        this.recuperarPorIdUrl = Utils.getUrlBackend() + '/api/evento/';
        this.atualizarStatusUrl = Utils.getUrlBackend() + '/api/evento/atualizarStatus';
        this.recuperarPorTipoStatusUrl = Utils.getUrlBackend() + '/api/evento';
        this.countParticipanteUrl = Utils.getUrlBackend() + '/api/evento/countParticipante';
        this.pesquisarParticipanteUrl = Utils.getUrlBackend() + '/api/evento/pesquisarParticipante';
        this.salvarParticipanteUrl = Utils.getUrlBackend() + '/api/evento/salvarParticipante';
        this.excluirParticipanteUrl = Utils.getUrlBackend() + '/api/evento/excluirParticipante';
    }

    salvar(evento: Evento) {
        return this.http.post(this.salvarUrl, evento).pipe(
            tap((res: Evento) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    count(filtro: Evento) {
        return this.http.post(this.countUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisar(pageSort: PageSort<Evento>) {
        return this.http.post(this.pesquisarUrl, pageSort).pipe(
            tap((res: Array<Evento>) => {
                for (const i of res) {
                    this.tratarDatas(i);
                }

                return res;
            })
        );
    }

    recuperarPorId(id: number) {
        return this.http.get(this.recuperarPorIdUrl + id).pipe(
            tap((res: Evento) => {
                this.tratarDatas(res);
                return res;
            })
        );
    }

    private tratarDatas(evento: Evento) {
        if (evento.dataCadastro) {
            evento.dataCadastro = new Date(evento.dataCadastro);
        }

        if (evento.dataAtualizacao) {
            evento.dataAtualizacao = new Date(evento.dataAtualizacao);
        }
    }

    atualizarStatus(evento: Evento) {
        return this.http.post(this.atualizarStatusUrl, evento);
    }

    recuperarPorTipoStatus(tipo: TipoPessoaEnum, status: StatusRegistroEnum) {
        return this.http.get(this.recuperarPorTipoStatusUrl + '/tipo/' + tipo + '/status/' + status).pipe(
            tap((res: Array<Evento>) => res)
        );
    }

    countParticipante(filtro: Participante) {
        return this.http.post(this.countParticipanteUrl, filtro).pipe(
            tap((res: number) => res)
        );
    }

    pesquisarParticipante(pageSort: PageSort<Participante>) {
        return this.http.post(this.pesquisarParticipanteUrl, pageSort).pipe(
            tap((res: Array<Participante>) => {
                return res;
            })
        );
    }

    salvarParticipante(participante: Participante) {
        return this.http.post(this.salvarParticipanteUrl, participante).pipe(
            tap((res: Participante) => {
                return res;
            })
        );
    }

    excluirParticipante(participante: Participante) {
        return this.http.post(this.excluirParticipanteUrl, participante).pipe();
    }

}
