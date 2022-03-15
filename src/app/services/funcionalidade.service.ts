import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../util/utils';
import { tap } from 'rxjs/operators';
import { Funcionalidade } from '../models/funcionalidade';

@Injectable({
    providedIn: 'root'
})
export class FuncionalidadeService {

    private listarAtivasUrl: string;

    constructor(private http: HttpClient) {
        this.listarAtivasUrl = Utils.getUrlBackend() + '/api/funcionalidade/ativas';
    }

    listarAtivas() {
        return this.http.get(this.listarAtivasUrl).pipe(
            tap((res: Array<Funcionalidade>) => res)
        );
    }
}
