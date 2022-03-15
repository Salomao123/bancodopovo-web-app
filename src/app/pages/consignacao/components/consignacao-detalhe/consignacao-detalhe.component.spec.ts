import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignacaoDetalheComponent } from './consignacao-detalhe.component';

describe('ConsignacaoDetalheComponent', () => {
  let component: ConsignacaoDetalheComponent;
  let fixture: ComponentFixture<ConsignacaoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignacaoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignacaoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
