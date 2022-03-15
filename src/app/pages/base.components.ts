import swal from 'sweetalert';
import { PaginationLoadLazy, PageQuery, SortMeta } from '../util/pagination';
import { Table } from 'primeng/table';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers/index';
import { selectExistFuncionalidadeAcao } from '../public/login/selectors/login.selectors';
import { FuncionalidadeEnum } from '../enums/funcionalidade';
import { AcaoEnum } from '../enums/acao';
import { Observable } from 'rxjs';

export class BaseComponent {

    funcionalidadeEnum = FuncionalidadeEnum;
    acaoEnum = AcaoEnum;

    constructor(private baseStore: Store<AppState>) {}

    resetTable(table: Table) {
        if (table) {
            table.reset();
        }
    }

    pageQuery(event: PaginationLoadLazy): PageQuery {
        const page: PageQuery = {
            first: event.first,
            max: (event.rows)
        };

        return page;
    }

    sortQuery(event: PaginationLoadLazy): SortMeta {
        const sort: SortMeta = {
            field: event.sortField,
            order: event.sortOrder
        };

        return sort;
    }

    addMessageError(error?: any) {

        let message: string;

        if (error && error.hasOwnProperty('error')) {
            const innerError = error.error;
            if (innerError && innerError.hasOwnProperty('message')) {
                message = innerError.message;
            }
        }

        if (!message) {
            message = 'Erro Inesperado!';
        }

        swal({
            text: message,
            icon: 'error',
            buttons: ['Fechar', false]
        });

    }

    addMessageErrorHtml(error?: any) {

        let message: string;

        if (error && error.hasOwnProperty('error')) {
            const innerError = error.error;
            if (innerError && innerError.hasOwnProperty('message')) {
                message = innerError.message;
            }
        }

        if (!message) {
            message = 'Erro Inesperado!';
        }

        console.log(message);

        var span = document.createElement("span");
        span.innerHTML = message;

        swal({
            content: span,
            icon: 'error',
            buttons: ['Fechar', false]
        });

    }

    permiteFuncionalidadeAcao(f: number, a: number): Observable<boolean> {
        return this.baseStore.pipe(select(selectExistFuncionalidadeAcao(f, a)));
    }
}
