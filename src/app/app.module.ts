import { AuthGuard } from './guard/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './layout/pages/pages.component';
import { PublicComponent } from './layout/public/public.component';
import { MenuComponent } from './layout/pages-template/menu/menu.component';
import { HeaderComponent } from './layout/pages-template/header/header.component';
import { UserDropComponent } from './layout/pages-template/user-drop/user-drop.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment.prod';
import { EffectsModule } from '@ngrx/effects';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { InterceptorHttpService } from './interceptors/interceptor.htt.service';
import { CookieService } from 'ngx-cookie-service';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { SentryErrorHandler } from './common/handler/sentry.error.handler';
import { AccessGuard } from './guard/access.guard';

import {
  MatAutocompleteModule,
  MatInputModule
} from '@angular/material';
import { ComponentsModule } from './common/components/components.module';
import { FormsModule } from '@angular/forms';


export function getToken() {
  return localStorage.getItem('cng_at');
}

/**
 * Se for passado no cabecalho do request 'no-loading': 'true' o loading nao sera exibido.
 * Deve ser feito no service durante na requisicao http.
 * Exemplo:
 * http.get(url, {headers: {'no-loading': 'true'}}).pipe();
 */
export function filterRequestLoading(req: HttpRequest<any>): boolean {
  const noLoading = req.headers.get('no-loading');
  if (noLoading) {
    return (noLoading === 'true');
  }
  return false;
}

registerLocaleData(localePt, 'pt-BR')

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    PublicComponent,
    MenuComponent,
    HeaderComponent,
    UserDropComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatInputModule,

    /** BlockUI */
    BlockUIModule.forRoot(),
    BlockUIHttpModule.forRoot({
      requestFilters: [filterRequestLoading]
    }),

    /** JWT */
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),

    /** NGRX Imports */
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([]),
  ],
  exports: [ MatAutocompleteModule, MatInputModule],
  providers: [
    AuthGuard,
    AccessGuard,

    /** Http Interceptor (access - token) */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttpService,
      multi: true
    },

    /** Cookie Service */
    CookieService,

    SentryErrorHandler,

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
