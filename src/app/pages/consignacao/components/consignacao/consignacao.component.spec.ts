import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignacaoComponent } from './consignacao.component';

describe('ConsignacaoComponent', () => {
  let component: ConsignacaoComponent;
  let fixture: ComponentFixture<ConsignacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
