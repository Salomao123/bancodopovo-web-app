import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaConsignatariaComponent } from './empresa-consignataria.component';

describe('EmpresaConsignatariaComponent', () => {
  let component: EmpresaConsignatariaComponent;
  let fixture: ComponentFixture<EmpresaConsignatariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaConsignatariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaConsignatariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
