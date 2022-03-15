import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignacaoRenovacaoComponent } from './consignacao-renovacao.component';

describe('ConsignacaoRenovacaoComponent', () => {
  let component: ConsignacaoRenovacaoComponent;
  let fixture: ComponentFixture<ConsignacaoRenovacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignacaoRenovacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignacaoRenovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
