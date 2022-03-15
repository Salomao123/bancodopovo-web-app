import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { ArquivoRemessaService } from '../../../services/arquivo-remessa.service';
import { PageSort } from '../../../vo/page.sort';
import * as ArquivoRemessaActions from '../actions/arquivo-remessa.actions';
import { selectArquivoRemessaState } from '../selectors/arquivo-remessa.selectors';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export class ArquivoRemessaEffects extends BasePaginatorEffects {

    countArquivoRemessa$ = super.baseCreateCount(ArquivoRemessaActions.countArquivoRemessa,
        ArquivoRemessaActions.countArquivoRemessaSucesso, ArquivoRemessaActions.countArquivoRemessaErro);

    countArquivoRemessaSucesso$ = super.baseCreateCountSuccess(ArquivoRemessaActions.countArquivoRemessaSucesso);

    pesquisarArquivoRemessa$ = super.baseCreateFind(ArquivoRemessaActions.pesquisarArquivoRemessa, selectArquivoRemessaState,
        ArquivoRemessaActions.pesquisarArquivoRemessaSucesso, ArquivoRemessaActions.pesquisarArquivoRemessaErro);

    enviarArquivoRetorno$ = createEffect(() => this.actions$.pipe(
        ofType(ArquivoRemessaActions.enviarArquivoRetorno),
        mergeMap(action => {
            if (!action.file) {
                super.addMessageError({ error: { message: 'O arquivo é obrigatório' } });
                return of(ArquivoRemessaActions.enviarArquivoRetornoErro());
            }

            return this.arquivoRemessaService.enviarRetorno(action.file).pipe(
                map(arquivoRemessa => {
                    super.addMessageSuccess('Arquivo enviado com sucesso');
                    return ArquivoRemessaActions.enviarArquivoRetornoSucesso({ arquivoRemessa, afterEnvio: action.afterEnvio });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ArquivoRemessaActions.enviarArquivoRetornoErro());
                })
            );
        })
    ));

    enviarArquivoRetornoSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(ArquivoRemessaActions.enviarArquivoRetornoSucesso),
        tap(action => {
            action.afterEnvio();
        })
    ), { dispatch: false });

    gerarArquivoRemessa$ = createEffect(() => this.actions$.pipe(
        ofType(ArquivoRemessaActions.gerarArquivoRemessa),
        mergeMap(action => {
            return this.arquivoRemessaService.gerarRemessa().pipe(
                map(res => {
                    if(!res.file){
                        super.addMessageSuccess( "Não é possível baixar este arquivo, pois é necessário ter um empréstimo ativo");
                    }else{
                        action.afterDownload(res.file, res.name);
                    }
                    return ArquivoRemessaActions.gerarArquivoRemessaSucesso();
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ArquivoRemessaActions.gerarArquivoRemessaErro());
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private arquivoRemessaService: ArquivoRemessaService) {
        super(actions$, store);
    }

    countRegistros(filtro: any) {
        return this.arquivoRemessaService.count(filtro);
    }
    findRegistros(pageSort: PageSort<any>) {
        return this.arquivoRemessaService.pesquisar(pageSort);
    }
    saveRegistro(registro: any) {
        throw new Error('Method not implemented.');
    }
    updateStatus(registro: any) {
        throw new Error('Method not implemented.');
    }

}
