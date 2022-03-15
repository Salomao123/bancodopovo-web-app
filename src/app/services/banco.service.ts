import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { tap } from 'rxjs/operators';
import { Banco } from '../models/banco';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BancoService {

    private listarAtivosUrl: string;

    constructor(private http: HttpClient) {
        this.listarAtivosUrl = Utils.getUrlBackend() + '/api/banco/ativo';
    }

    listarAtivos() {
        return this.http.get(this.listarAtivosUrl).pipe(
            tap((res: Banco[]) => res)
        );
    }
}
