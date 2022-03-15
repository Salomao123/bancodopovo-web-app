import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers/index';
import { Observable } from 'rxjs';
import { selectIsLoggedIn, selectExistFuncionalidade } from '../public/login/selectors/login.selectors';
import { tap } from 'rxjs/operators';
import { MenuUtil } from '../util/menu.util';

export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>,
                private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

            return this.store
                    .pipe(
                        select(selectIsLoggedIn),
                        tap(loggedIn => {
                            if (!loggedIn) {
                                this.router.navigateByUrl('/');
                            }
                        })
                    );
        }

}
