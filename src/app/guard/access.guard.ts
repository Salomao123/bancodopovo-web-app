import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../reducers/index';
import { Store, select } from '@ngrx/store';
import { MenuUtil } from '../util/menu.util';
import { selectHasAccess } from '../public/login/selectors/login.selectors';
import { tap } from 'rxjs/operators';

export class AccessGuard implements CanActivate {

    constructor(private store: Store<AppState>,
                private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const funcionalidade = this.getPermissionBasedOnUrl();

        return this.store.pipe(
            select(selectHasAccess(funcionalidade)),
            tap(access => {
                if (!access) {
                    this.router.navigateByUrl('/pages/home-admin');
                }
            })
        );

        return false;
    }

    getPermissionBasedOnUrl() {
        const url = window.location.href;

        if (url.includes('/pages/')) {
            const indexOfPage = url.indexOf('/pages');
            const path = url.substring(indexOfPage);

            const menu = MenuUtil.menus.find(m => m.link === path);
            return (menu) ? menu.funcionalidade : null;
        }

    }

}