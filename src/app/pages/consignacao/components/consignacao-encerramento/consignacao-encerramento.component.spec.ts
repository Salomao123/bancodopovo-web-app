import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignacaoEncerramentoComponent } from './consignacao-encerramento.component';

describe('ConsignacaoEncerramentoComponent', () => {
  let component: ConsignacaoEncerramentoComponent;
  let fixture: ComponentFixture<ConsignacaoEncerramentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignacaoEncerramentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignacaoEncerramentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
