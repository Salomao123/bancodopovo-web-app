import swal from 'sweetalert';
import { PageQuery, SortMeta } from '../util/pagination';
import * as Sentry from '@sentry/browser';

Sentry.init({
    dsn: 'http://eca5bac990c64256a6d9e001f7a39c3a@178.238.235.110:9080/2'
});

export class BaseEffects {

    addMessageSuccess(message: string) {
        swal({
            text: message,
            icon: 'success',
            buttons: ['Fechar', false]
        });
    }

    addMessageWarning(message: string) {
        swal({
            text: message,
            icon: 'warning',
            buttons: ['Fechar', false]
        });
    }

    addMessageError(error?: any) {

        Sentry.captureException(error.originalError || error);

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

    getPageSort(filter: any, page: PageQuery, sort?: SortMeta) {
        return {
            filter,
            first: page.first,
            pageSize: page.max,
            sortField: (sort) ? sort.field : undefined,
            sortOrder: (sort) ? sort.order : undefined
        };
    }
}
