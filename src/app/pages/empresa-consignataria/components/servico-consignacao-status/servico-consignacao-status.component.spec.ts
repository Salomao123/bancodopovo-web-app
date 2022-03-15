import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoConsignacaoStatusComponent } from './servico-consignacao-status.component';

describe('ServicoConsignacaoStatusComponent', () => {
  let component: ServicoConsignacaoStatusComponent;
  let fixture: ComponentFixture<ServicoConsignacaoStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoConsignacaoStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicoConsignacaoStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
