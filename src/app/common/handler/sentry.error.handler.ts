import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';

Sentry.init({
    dsn: 'http://eca5bac990c64256a6d9e001f7a39c3a@178.238.235.110:9080/2'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {

    constructor() {}

    handleError(error: any): void {
        Sentry.captureException(error.originalError || error);
        throw error;
    }

}
