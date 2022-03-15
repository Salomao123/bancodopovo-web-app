import { Component, OnInit } from '@angular/core';
import testeImpressaoCss from './teste-impressao.component.scss';

@Component({
  selector: 'app-teste-impressao',
  templateUrl: './teste-impressao.component.html',
  styleUrls: ['./teste-impressao.component.scss']
})
export class TesteImpressaoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getCss() {
    return testeImpressaoCss;
  }

}
