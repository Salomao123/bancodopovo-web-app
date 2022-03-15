import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpregadoConsignanteComponent } from './empregado-consignante.component';

describe('EmpregadoConsignanteComponent', () => {
  let component: EmpregadoConsignanteComponent;
  let fixture: ComponentFixture<EmpregadoConsignanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpregadoConsignanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpregadoConsignanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
