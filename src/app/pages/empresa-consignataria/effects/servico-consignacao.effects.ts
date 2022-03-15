import { ServicoConsignacao } from './../../../models/servico-consignacao';
import { BasePaginatorEffects } from '../../base.effects.paginator';
import { ServicoConsignacaoService } from 'src/app/services/servico-consignacao.service';
import { AppState } from '../../../reducers/index';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { PageSort } from '../../../vo/page.sort';
import * as ServicoConsignacaoActions from '../actions/servico-consignacao.actions';
import { selectServicoConsignacaoState } from '../selectors/servico-consignacao.selectors';

export class ServicoConsignacaoEffects extends BasePaginatorEffects {

    countServicoConsignacao$ = super.baseCreateCount(ServicoConsignacaoActions.countServicoConsignacao,
        ServicoConsignacaoActions.countServicoConsignacaoSucesso, ServicoConsignacaoActions.countServicoConsignacaoErro);

    countServicoConsignacaoServico$ = super.baseCreateCountSuccess(ServicoConsignacaoActions.countServicoConsignacaoSucesso);

    pesquisarServicoConsignacao$ = super.baseCreateFind(ServicoConsignacaoActions.pesquisarServicoConsignacao,
        selectServicoConsignacaoState, ServicoConsignacaoActions.pesquisarServicoConsignacaoSucesso,
        ServicoConsignacaoActions.pesquisarServicoConsignacaoErro);

    salvarServicoConsignacao$ = super.baseCreateSave(ServicoConsignacaoActions.salvarServicoConsignacao,
        ServicoConsignacaoActions.salvarServicoConsignacaoSucesso);

    atualizarStatusServicoConsignacao$ = super.baseCreateUpdateStatus(ServicoConsignacaoActions.atualizarStatusServicoConsignacao,
        ServicoConsignacaoActions.atualizarStatusServicoConsignacaoSucesso);

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private servicoConsignacaoService: ServicoConsignacaoService) {
        super(actions$, store);
    }

    countRegistros(filtro: ServicoConsignacao) {
        return this.servicoConsignacaoService.count(filtro);
    }

    findRegistros(pageSort: PageSort<ServicoConsignacao>) {
        return this.servicoConsignacaoService.pesquisar(pageSort);
    }

    saveRegistro(registro: ServicoConsignacao) {
        return this.servicoConsignacaoService.salvar(registro);
    }

    updateStatus(registro: ServicoConsignacao) {
        return this.servicoConsignacaoService.atualizarStatus(registro);
    }


}
