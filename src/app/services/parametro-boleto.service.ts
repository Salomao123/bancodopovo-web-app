import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../util/utils';
import { tap } from 'rxjs/operators';
import { ManutParametroBoletoVo } from '../vo/manut-parametro-boleto.vo';
import { ParametroBoleto } from '../models/parametro.boleto';

@Injectable({
    providedIn: 'root'
})
export class ParametroBoletoService {

    private recuperarUrl: string;
    private atualizarUrl: string;

    constructor(private http: HttpClient) {
        this.recuperarUrl = Utils.getUrlBackend() + '/api/parametro-boleto';
        this.atualizarUrl = Utils.getUrlBackend() + '/api/parametro-boleto';
    }

    recuperar() {
        return this.http.get(this.recuperarUrl).pipe(
            tap((res: ManutParametroBoletoVo) => res)
        );
    }

    atualizar(parametro: ParametroBoleto) {
        return this.http.post(this.atualizarUrl, parametro).pipe(
            tap((res: ParametroBoleto) => res)
        );
    }

}
