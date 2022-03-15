import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignacaoSuspensaoCancelamentoComponent } from './consignacao-suspensao-cancelamento.component';

describe('ConsignacaoSuspensaoCancelamentoComponent', () => {
  let component: ConsignacaoSuspensaoCancelamentoComponent;
  let fixture: ComponentFixture<ConsignacaoSuspensaoCancelamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignacaoSuspensaoCancelamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignacaoSuspensaoCancelamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
