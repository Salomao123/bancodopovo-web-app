import { VisualizacaoMargem } from './../../../models/visualizacao-margem';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MargemService } from '../../../services/margem.service';
import { PageSort } from '../../../vo/page.sort';
import * as VisualizacaoMargemActions from '../actions/visualizacao-margem.actions';
import { selectVisualizacaoMargemState } from '../selectors/visualizacao-margem.selectors';
import { mergeMap, map } from 'rxjs/operators';
import { AppState } from '../../../reducers/index';

@Injectable()
export class VisualizacaoMargemEffects extends BasePaginatorEffects {

    countVisualizacaoMargem$ = super.baseCreateCount(VisualizacaoMargemActions.countVisualizacaoMargem,
        VisualizacaoMargemActions.countVisualizacaoMargemSucesso, VisualizacaoMargemActions.countVisualizacaoMargemErro);

    countVisualizacaoMargemSucesso$ = super.baseCreateCountSuccess(VisualizacaoMargemActions.countVisualizacaoMargemSucesso);

    pesquisarVisualizacaoMargem$ = super.baseCreateFind(VisualizacaoMargemActions.pesquisarVisualizacaoMargem,
        selectVisualizacaoMargemState, VisualizacaoMargemActions.pesquisarVisualizacaoMargemSucesso,
        VisualizacaoMargemActions.pesquisarVisualizacaoMargemErro);


    atualizarSituacaoVisualizacaoMargem$ = createEffect(() => this.action$.pipe(
        ofType(VisualizacaoMargemActions.atualizarSituacaoVisualizacaoMargem),
        mergeMap((action) => {
            const margem = new VisualizacaoMargem();
            margem.id = action.id;
            margem.situacao = action.situacao;

            return this.margemService.atualizarSituacao(margem).pipe(
                map(res => VisualizacaoMargemActions.atualizarSituacaoVisualizacaoMargemSucesso(
                    { id: action.id, situacao: action.situacao }))
            );
        })
    ));

    constructor(private action$: Actions,
                private store: Store<AppState>,
                private margemService: MargemService) {
        super(action$, store);
    }

    countRegistros(filtro: VisualizacaoMargem) {
        return this.margemService.count(filtro);
    }
    findRegistros(pageSort: PageSort<VisualizacaoMargem>) {
        return this.margemService.pesquisar(pageSort);
    }
    saveRegistro(registro: any) {
        throw new Error('Method not implemented.');
    }
    updateStatus(registro: any) {
        throw new Error('Method not implemented.');
    }

}
