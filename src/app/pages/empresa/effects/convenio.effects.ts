import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { ConvenioService } from '../../../services/convenio.service';
import { EmpresaConsignatariaService } from '../../../services/empresa-consignataria.service';
import { Convenio } from '../../../models/convenio';
import { PageSort } from '../../../vo/page.sort';
import * as ConvenioActions from '../actions/convenio.actions';
import { selectConvenioState, selectEmpresaConsignatariaSelecionada } from '../selectors/convenio.selectors';
import { mergeMap, map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { StatusRegistroEnum } from 'src/app/enums/status.registro';
import { of } from 'rxjs';

export class ConvenioEffects extends BasePaginatorEffects {

    countConvenio$ = super.baseCreateCount(ConvenioActions.countConvenio,
        ConvenioActions.countConvenioSucesso, ConvenioActions.countConvenioErro);

    countConvenioSucesso$ = super.baseCreateCountSuccess(ConvenioActions.countConvenioSucesso);

    pesquisarConvenio$ = super.baseCreateFind(ConvenioActions.pesquisarConvenio,
        selectConvenioState, ConvenioActions.pesquisarConvenioSucesso,
        ConvenioActions.pesquisarConvenioErro);

    salvarConvenio$ = super.baseCreateSave(ConvenioActions.salvarConvenio,
        ConvenioActions.salvarConvenioSucesso);

    atualizarStatusConvenio$ = createEffect(() => this.actions$.pipe(
        ofType(ConvenioActions.atualizarStatusConvenio),
        mergeMap(action => {
            const convenio = new Convenio();
            convenio.id = action.id;
            convenio.situacao = action.situacao;

            return this.convenioService.atualizarStatus(convenio).pipe(
                map(res => ConvenioActions.atualizarStatusConvenioSucesso({ id: action.id, situacao: action.situacao })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    carregarDependenciasConvenio$ = createEffect(() => this.actions$.pipe(
        ofType(ConvenioActions.carreagarDependenciasConvenio),
        mergeMap(action =>
            of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectEmpresaConsignatariaSelecionada(action.registro.empresaConsignataria.id)))
                )
            )
        ),
        switchMap(([action, empresaConsignataria]) => {
            const registro = Object.assign({}, action.registro);
            registro.empresaConsignataria = empresaConsignataria;

            return of(ConvenioActions.salvarConvenio({ registro, afterSave: action.afterSave }));
        })
    ));

    consultarEmpresasConsignatariasConvenio$ = createEffect(() => this.actions$.pipe(
        ofType(ConvenioActions.consultarEmpresasConsignatariasConvenio),
        mergeMap(() => {
            return this.empresaConsignatariaService.recuperarPorStatus(StatusRegistroEnum.ATIVO).pipe(
                map(empresasConsignatarias => ConvenioActions.consultarEmpresasConsignatariasConvenioSucesso({ empresasConsignatarias })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private convenioService: ConvenioService,
                private empresaConsignatariaService: EmpresaConsignatariaService) {
        super(actions$, store);
    }

    countRegistros(filtro: Convenio) {
        return this.convenioService.count(filtro);
    }
    findRegistros(pageSort: PageSort<Convenio>) {
        return this.convenioService.pesquisar(pageSort);
    }
    saveRegistro(registro: Convenio) {
        return this.convenioService.salvar(registro);
    }
    updateStatus(registro: any) {
        throw new Error('Method not implemented.');
    }


}
