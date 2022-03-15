import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadoConsignanteNovoComponent } from './empregado-consignante-novo.component';

describe('EmpregadoConsignanteNovoComponent', () => {
  let component: EmpregadoConsignanteNovoComponent;
  let fixture: ComponentFixture<EmpregadoConsignanteNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadoConsignanteNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadoConsignanteNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
