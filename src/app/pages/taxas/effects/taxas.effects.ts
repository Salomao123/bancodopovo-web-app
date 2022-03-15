import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { ServicoConsignacaoService } from '../../../services/servico-consignacao.service';
import * as TaxasActions from '../actions/taxax.actions';
import * as TaxasParcelasActions from '../actions/taxas-parcelas.actions';
import { mergeMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { StatusRegistroEnum } from 'src/app/enums/status.registro';
import { of, Observable } from 'rxjs';
import { selectParcelasServicoSelecionado } from '../selectors/taxas.selectors';

export class TaxasEffects extends BaseEffects {

    recuperarServicosConsignacoesAtivos$ = createEffect(() => this.actions$.pipe(
        ofType(TaxasActions.recuperarServicosConsignacoesAtivosTaxas),
        mergeMap(action => {
            return this.servicoConsignacaoService.recuperarPorStatus(StatusRegistroEnum.ATIVO).pipe(
                map(servicosConsignacoes => TaxasActions.recuperarServicosConsignacoesAtivosTaxasSucesso({ servicosConsignacoes })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(TaxasActions.recuperarServicosConsignacoesAtivosTaxasErro());
                })
            );
        })
    ));

    salvarServicoConsignacaoTaxas$ = createEffect(() => this.actions$.pipe(
        ofType(TaxasActions.salvarServicoConsignacaoTaxa),
        mergeMap(action => {
            return this.servicoConsignacaoService.salvar(action.servico).pipe(
                map(servico => {
                    super.addMessageSuccess('Taxas atualizadas com sucesso.');
                    return TaxasActions.salvarServicoConsignacaoTaxaSucesso({ servico: action.servico, afterSalvar: action.afterSalvar });
                }),
                catchError(err => {
                    super.addMessageError(err);
                    return of(TaxasActions.salvarServicoConsignacaoTaxaErro());
                })
            );
        })
    ));

    salvarServicoConsignacaoTaxasSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(TaxasActions.salvarServicoConsignacaoTaxaSucesso),
        tap(action => action.afterSalvar())
    ), { dispatch: false });

    recuperarParcelasServicoConsignacaoTaxa$ = createEffect(() => this.actions$.pipe(
        ofType(TaxasActions.recuperarParcelasServicoConsignacaoTaxa),
        withLatestFrom(this.store.pipe(select(selectParcelasServicoSelecionado))),
        mergeMap(([action, servicoParcelas]) => {
            if (!servicoParcelas) {
                return this.servicoConsignacaoService.recuperarParcelasPorServicoConsignacao(action.idServicoConsignacao).pipe(
                    map(parcelas => TaxasActions.recuperarParcelasServicoConsignacaoTaxaSucesso(
                        { idServicoConsignacao: action.idServicoConsignacao, parcelas, afterConsulta: action.afterConsulta })),
                    catchError(err => {
                        super.addMessageError(err);
                        return of(TaxasActions.recuperarParcelasServicoConsignacaoTaxaErro());
                    })
                );
            } else {
                return of(TaxasActions.recuperarParcelasServicoConsignacaoTaxaSucesso(
                    {
                        idServicoConsignacao: action.idServicoConsignacao,
                        parcelas: servicoParcelas, afterConsulta: action.afterConsulta
                    }));
            }
        })
    ));

    recuperarParcelasServicoConsignacaoTaxaSucesso$ = createEffect(() => this.actions$.pipe(
        ofType(TaxasActions.recuperarParcelasServicoConsignacaoTaxaSucesso),
        mergeMap(action =>  of(TaxasParcelasActions.carregarParcelasTaxasParcelas(
            { parcelas: action.parcelas, afterCarregar: action.afterConsulta })))
    ));

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private servicoConsignacaoService: ServicoConsignacaoService) {
        super();
    }
}
