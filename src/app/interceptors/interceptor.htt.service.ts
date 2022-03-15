import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Utils } from '../util/utils';
import { switchMap, share, tap, catchError, finalize } from 'rxjs/operators';
import { TokenUser } from '../models/token.user';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/index';
import { efetuarLogoutAction } from '../public/login/actions/login.actions';

export class InterceptorHttpService implements HttpInterceptor {

    constructor(private store: Store<AppState>,
                private loginService: LoginService,
                private cookieService: CookieService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let obs: Observable<any> = null;

        const noContentType = request.headers.get('no-content-type');

        if (localStorage.getItem('cng_at')) {
            if (noContentType) {

                obs = next.handle(request.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + localStorage.getItem('cng_at'),
                        'Accept-Language': this.getLanguage()
                    }
                }));

            } else {
                obs = next.handle(request.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + localStorage.getItem('cng_at'),
                        'Accept-Language': this.getLanguage(),
                        'Content-Type': 'application/json'
                    }
                }));
            }
        } else {
            obs = next.handle(request.clone({
                setHeaders: {
                    'Accept-Language': this.getLanguage(),
                    'Content-Type': 'application/json'
                }
            }));
        }

        return obs.pipe(
            tap(
                (res) => res
            ),
            catchError((error: Error) => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 200: {
                                const res = new HttpResponse({
                                    body: null,
                                    headers: error.headers,
                                    status: error.status,
                                    statusText: error.statusText,
                                    url: error.url
                                });
                                return of(res);
                            }
                        case 401: {
                                return this.getAccessToken(request, next);
                            }
                        default: {
                                throw error;
                            }
                    }
                }
            })
        );

    }

    private getAccessToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return this.loginService.novoAccessToken().pipe(
            switchMap(
                res => {

                    const tokenUser = res as TokenUser;

                    localStorage.removeItem('cng_at');
                    localStorage.removeItem('cng_rt');

                    localStorage.setItem('cng_at', tokenUser.access_token);
                    localStorage.setItem('cng_rt', tokenUser.refresh_token);

                    return next.handle(req.clone({
                        setHeaders: {
                            Authorization: 'Bearer ' + localStorage.getItem('cng_at'),
                            'Accept-Language': this.getLanguage(),
                            'Content-Type': 'application/json'
                        }
                    }));
                }
            ),
            catchError(err => {
                this.store.dispatch(efetuarLogoutAction());

                const error = {
                    message: 'Sessão expirada!'
                };

                err.error = error;
                throw err;
            }),
            share()
        );
    }

    private getLanguage(): string {
        const lang = this.cookieService.get('app-language');
        return (lang && lang.length > 0) ? lang : Utils.getDefaultLanguage();
    }

}
