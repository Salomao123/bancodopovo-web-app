import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { EmpregadoConsignanteService } from '../../../services/empregado-consignante.service';
import { EmpregadoConsignante } from '../../../models/empregado-consignante';
import { PageSort } from '../../../vo/page.sort';
import * as EmpregadoConsignanteActions from '../actions/empregado-consignante.actions';
import { selectEmpregadoConsignanteState, selectEmpregadoConsignantePorId } from '../selectors/empregado-consignante.selectors';
import { mergeMap, catchError, map, withLatestFrom, switchMap, tap } from 'rxjs/operators';
import { PessoaService } from '../../../services/pessoa.service';
import { TipoPessoaEnum } from 'src/app/enums/tipo.pessoa';
import { StatusRegistroEnum } from 'src/app/enums/status.registro';
import { EmpresaService } from '../../../services/empresa.service';
import { of, Observable } from 'rxjs';

export class EmpregadoConsignanteEffects extends BasePaginatorEffects {

    countEmpregadoConsignante$ = super.baseCreateCount(EmpregadoConsignanteActions.countEmpregadoConsignante,
        EmpregadoConsignanteActions.countEmpregadoConsignanteSucesso, EmpregadoConsignanteActions.countEmpregadoConsignanteErro);

    countEmpregadoConsignanteSucesso$ = super.baseCreateCountSuccess(EmpregadoConsignanteActions.countEmpregadoConsignanteSucesso);

    pesquisarEmpregadoConsignante$ = super.baseCreateFind(EmpregadoConsignanteActions.pesquisarEmpregadoConsignante,
        selectEmpregadoConsignanteState, EmpregadoConsignanteActions.pesquisarEmpregadoConsignanteSucesso,
        EmpregadoConsignanteActions.pesquisarEmpregadoConsignanteErro);

    salvarEmpregadoConsignante$ = super.baseCreateSave(EmpregadoConsignanteActions.salvarEmpregadoConsignante,
        EmpregadoConsignanteActions.salvarEmpregadoConsignanteSucesso);

    atualizarStatusEmpregadoConsignante$ = super.baseCreateUpdateStatus(EmpregadoConsignanteActions.atualizarStatusEmpregadoConsignante, 
        EmpregadoConsignanteActions.atualizarStatusEmpregadoConsignanteSucesso);

    consultarPessoasFisicasEmpCons$ = createEffect(() => this.actions$.pipe(
        ofType(EmpregadoConsignanteActions.consultarPessoasFisicasEmpregadoConsignante),
        mergeMap(() => {
            return this.pessoaService.recuperarPorTipoStatus(TipoPessoaEnum.FISICA, StatusRegistroEnum.ATIVO).pipe(
                map(pessoasFisicas => EmpregadoConsignanteActions.consultarPessoasFisicasEmpregadoConsignanteSucesso({ pessoasFisicas })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    consultarEmpresasEmpCons$ = createEffect(() => this.actions$.pipe(
        ofType(EmpregadoConsignanteActions.consultarEmpresasEmpregadoConsignante),
        mergeMap(() => {
            return this.empresaService.recuperarPorStatus(StatusRegistroEnum.ATIVO).pipe(
                map(empresas => EmpregadoConsignanteActions.consultarEmpresasEmpregadoConsignanteSucesso({ empresas })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    recuperarEmpregadoConsignantePorId$ = createEffect(() => this.actions$.pipe(
        ofType(EmpregadoConsignanteActions.recuperarPorIdEmpregadoConsignante),
        map((action) => {
            return { id: action.id, afterConsulta: action.afterConsulta };
        }),
        mergeMap((vo) =>
            of(vo).pipe(
                withLatestFrom(this.store.pipe(select(selectEmpregadoConsignantePorId(vo.id))))
            )
        ),
        switchMap(([vo, empregado]) => {
            if (!empregado.salario) {
                return this.empregadoConsignanteService.recuperarPorId(vo.id).pipe(
                    map(empregadoConsignante => EmpregadoConsignanteActions.recuperarPorIdEmpregadoConsignanteSucesso(
                        { empregadoConsignante, afterConsulta: vo.afterConsulta })),
                    catchError(err => {
                        super.addMessageError(err);
                        throw err;
                    })
                );
            } else {
                return of(EmpregadoConsignanteActions.recuperarPorIdEmpregadoConsignanteSucesso(
                    { empregadoConsignante: empregado, afterConsulta: vo.afterConsulta }));
            }
        })
    ));

    recuperarEmpregadoConsignantePorIdSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(EmpregadoConsignanteActions.recuperarPorIdEmpregadoConsignanteSucesso),
        tap(action => {
            action.afterConsulta(action.empregadoConsignante);
        })
    ), { dispatch: false });

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private empregadoConsignanteService: EmpregadoConsignanteService,
                private pessoaService: PessoaService,
                private empresaService: EmpresaService) {
        super(actions$, store);
    }

    countRegistros(filtro: EmpregadoConsignante) {
        return this.empregadoConsignanteService.count(filtro);
    }
    findRegistros(pageSort: PageSort<EmpregadoConsignante>) {
        return this.empregadoConsignanteService.pesquisar(pageSort);
    }
    saveRegistro(registro: EmpregadoConsignante) {
        return this.empregadoConsignanteService.salvar(registro);
    }
    updateStatus(registro: EmpregadoConsignante) {
        return this.empregadoConsignanteService.atualizarStatus(registro);
    }
}
