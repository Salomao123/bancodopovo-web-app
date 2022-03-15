import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { tap } from 'rxjs/operators';
import { Parametro } from '../models/parametro';

@Injectable({
    providedIn: 'root'
})
export class ParametroService {

    private recuperarUrl: string;
    private atualizarUrl: string;

    constructor(private http: HttpClient) {
        this.recuperarUrl = Utils.getUrlBackend() + '/api/parametro';
        this.atualizarUrl = Utils.getUrlBackend() + '/api/parametro';
    }

    recuperar() {
        return this.http.get(this.recuperarUrl).pipe(
            tap((res: Parametro) => res)
        );
    }

    atualizar(parametro: Parametro) {
        return this.http.post(this.atualizarUrl, parametro);
    }

}
