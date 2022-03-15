import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosBoletoComponent } from './parametros-boleto.component';

describe('ParametrosBoletoComponent', () => {
  let component: ParametrosBoletoComponent;
  let fixture: ComponentFixture<ParametrosBoletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosBoletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
