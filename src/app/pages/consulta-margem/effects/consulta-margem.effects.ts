import { BaseEffects } from '../../base.effects';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { MargemService } from '../../../services/margem.service';
import * as ConsultaMargemActions from '../actions/consulta-margem.actions';
import { mergeMap, map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ServicoConsignacaoService } from '../../../services/servico-consignacao.service';
import { StatusRegistroEnum } from 'src/app/enums/status.registro';
import { PropostaService } from '../../../services/proposta.service';
import { selectServicoConsignacaoParaProposta } from '../selectors/consulta-margem.selectors';

export class ConsultaMargemEffects extends BaseEffects {

    consultarMargem$ = createEffect(() => this.actions$.pipe(
        ofType(ConsultaMargemActions.consultarMargem),
        mergeMap((action) => {
            return this.margemService.consultarMargem(action.cpf).pipe(
                map(margem => ConsultaMargemActions.consultarMargemSucesso({ margem })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsultaMargemActions.consultarMargemErro());
                })
            );
        })
    ));

    solicitarConsultaMargem$ = createEffect(() => this.actions$.pipe(
        ofType(ConsultaMargemActions.solicitarConsultaMargem),
        mergeMap((action) => {
            return this.margemService.solicitar(action.margem).pipe(
                map(margem => ConsultaMargemActions.solicitarConsultaMargemSucesso({ margem, afterSolicitar: action.afterSolicitar })),
                catchError(err => {
                    super.addMessageError(err);
                    return of(ConsultaMargemActions.solicitarConsultaMargemErro());
                })
            );
        })
    ));

    recuperarServicosConsignacaoAtivos$ = createEffect(() => this.actions$.pipe(
        ofType(ConsultaMargemActions.recuperarServicosConsignacaoAtivosConsultaMargem),
        mergeMap((action) => {
            return this.servicoConsignacaoService.recuperarPorStatus(StatusRegistroEnum.ATIVO).pipe(
                map(servicos => ConsultaMargemActions.recuperarServicosConsignacaoAtivosConsultaMargemSucesso({ servicos })),
                catchError(err => {
                    super.addMessageError(err);
                    throw err;
                })
            );
        })
    ));

    salvarPropostaConsultaMargem$ = createEffect(() => this.actions$.pipe(
        ofType(ConsultaMargemActions.salvarPropostaConsultaMargem),
        map((action) => action),
        mergeMap((action) =>
            of(action).pipe(
                withLatestFrom(this.store.pipe(select(selectServicoConsignacaoParaProposta(action.proposta.servicoConsignacao.id))))
            )),
        switchMap(([action, servicos]) => {
            if (!servicos || servicos.length === 0) {
                super.addMessageError({ error: { message: 'Erro ao recuperar serviço de consignação' } });
                return of(ConsultaMargemActions.salvarPropostaConsultaMargemErro());
            } else {

                const proposta = Object.assign({}, action.proposta);
                proposta.servicoConsignacao = Object.assign({}, servicos[0]);

                return this.propostaService.salvar(proposta).pipe(
                    map(res => {
                        super.addMessageSuccess('Proposta salvar com sucesso');
                        action.afterSave();
                        return ConsultaMargemActions.salvarPropostaConsultaMargemSucesso();
                    })
                );
            }
        })
    ));

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private margemService: MargemService,
                private servicoConsignacaoService: ServicoConsignacaoService,
                private propostaService: PropostaService) {
        super();
    }
}
