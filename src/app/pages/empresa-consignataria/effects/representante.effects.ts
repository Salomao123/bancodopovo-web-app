import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { RepresentanteService } from '../../../services/representante.service';
import { Representante } from 'src/app/models/representante';
import { PageSort } from '../../../vo/page.sort';
import { PessoaService } from '../../../services/pessoa.service';
import * as RepresentanteActions from '../actions/representante.actions';
import { selectRepresentanteState, selectPessoaFisicaSelecionada } from '../selectors/representante.selectors';
import { mergeMap, map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { TipoPessoaEnum } from '../../../enums/tipo.pessoa';
import { StatusRegistroEnum } from '../../../enums/status.registro';
import { of } from 'rxjs';

export class RepresentanteEffects extends BasePaginatorEffects {

    countRepresentante$ = super.baseCreateCount(RepresentanteActions.countRepresentante,
        RepresentanteActions.countRepresentanteSucesso, RepresentanteActions.countRepresentanteErro);

    countRepresentanteSucesso$ = super.baseCreateCountSuccess(RepresentanteActions.countRepresentanteSucesso);

    pesquisarRepresentante$ = super.baseCreateFind(RepresentanteActions.pesquisarRepresentante,
        selectRepresentanteState, RepresentanteActions.pesquisarRepresentanteSucesso,
        RepresentanteActions.pesquisarRepresentanteErro);

    salvarReoresentante$ = super.baseCreateSave(RepresentanteActions.salvarRepresentante,
        RepresentanteActions.salvarRepresentanteSucesso);

    atualizarStatus = super.baseCreateUpdateStatus(RepresentanteActions.atualizarStatusRepresentante,
        RepresentanteActions.atualizarStatusRepresentanteSucesso);

    carregarDependenciasRepresentante$ = createEffect(() => this.actions$.pipe(
        ofType(RepresentanteActions.carreagarDependenciasRepresentante),
        mergeMap((action) =>
            of(action).pipe(
                withLatestFrom(
                    this.store.pipe(select(selectPessoaFisicaSelecionada(action.registro.pessoa.id)))
                )
            )
        ),
        switchMap(([action, pessoa]) => {
            const registro = Object.assign({}, action.registro);
            registro.pessoa = pessoa;
            return of(RepresentanteActions.salvarRepresentante({ registro, afterSave: action.afterSave }));
        })
    ));

    consultarPessoasFisicas$ = createEffect(() => this.actions$.pipe(
        ofType(RepresentanteActions.consultarPessoasFisicasRep),
        mergeMap(() => {
            return this.pessoaService.recuperarPorTipoStatus(TipoPessoaEnum.FISICA, StatusRegistroEnum.ATIVO).pipe(
                map(pessoasFisicas => RepresentanteActions.consultarPessoasFisicasRepSucesso({ pessoasFisicas })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private representanteService: RepresentanteService,
                private pessoaService: PessoaService) {
        super(actions$, store);
    }

    countRegistros(filtro: Representante) {
        return this.representanteService.count(filtro);
    }
    findRegistros(pageSort: PageSort<Representante>) {
        return this.representanteService.pesquisar(pageSort);
    }
    saveRegistro(registro: Representante) {
        return this.representanteService.salvar(registro);
    }
    updateStatus(registro: Representante) {
        return this.representanteService.atualizarStatus(registro);
    }
}
