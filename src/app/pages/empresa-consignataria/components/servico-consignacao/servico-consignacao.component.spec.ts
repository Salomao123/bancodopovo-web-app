import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoConsignacaoComponent } from './servico-consignacao.component';

describe('ServicoConsignacaoComponent', () => {
  let component: ServicoConsignacaoComponent;
  let fixture: ComponentFixture<ServicoConsignacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoConsignacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoConsignacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
