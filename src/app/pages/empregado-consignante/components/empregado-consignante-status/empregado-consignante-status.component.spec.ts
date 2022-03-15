import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadoConsignanteStatusComponent } from './empregado-consignante-status.component';

describe('EmpregadoConsignanteStatusComponent', () => {
  let component: EmpregadoConsignanteStatusComponent;
  let fixture: ComponentFixture<EmpregadoConsignanteStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadoConsignanteStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadoConsignanteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
