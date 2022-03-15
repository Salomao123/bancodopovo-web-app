import { BasePaginatorEffects } from '../../base.effects.paginator';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers/index';
import { Actions } from '@ngrx/effects';
import { ContatoService } from '../../../services/contato.service';
import { Contato } from '../../../models/contato';
import { PageSort } from '../../../vo/page.sort';
import * as ContatoActions from '../actions/contato.action';
import { selectContatoState } from '../selectors/contato.selectors';

export class ContatoEffects extends BasePaginatorEffects {

    countContato$ = super.baseCreateCount(ContatoActions.countContato,
        ContatoActions.countContatoSucesso, ContatoActions.countContatoErro);

    countContatoSucesso$ = super.baseCreateCountSuccess(ContatoActions.countContatoSucesso);

    pesquisarContato$ = super.baseCreateFind(ContatoActions.pesquisarContato,
        selectContatoState, ContatoActions.pesquisarContatoSucesso,
        ContatoActions.pesquisarContatoErro);

    salvarContato$ = super.baseCreateSave(ContatoActions.salvarContato,
        ContatoActions.salvarContatoSucesso);

    atualizarStatusContato = super.baseCreateUpdateStatus(ContatoActions.atualizarStatusContato,
        ContatoActions.atualizarStatusContatoSucesso);

    constructor(private actions$: Actions,
                private store: Store<AppState>,
                private contatoService: ContatoService) {
        super(actions$, store);
    }

    countRegistros(filtro: Contato) {
        return this.contatoService.count(filtro);
    }
    findRegistros(pageSort: PageSort<Contato>) {
        return this.contatoService.pesquisar(pageSort);
    }
    saveRegistro(registro: Contato) {
        return this.contatoService.salvar(registro);
    }
    updateStatus(registro: Contato) {
        return this.contatoService.atualizarStatus(registro);
    }
}
