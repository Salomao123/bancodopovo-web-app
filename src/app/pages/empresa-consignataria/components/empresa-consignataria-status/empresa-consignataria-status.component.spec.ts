import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaConsignatariaStatusComponent } from './empresa-consignataria-status.component';

describe('EmpresaConsignatariaStatusComponent', () => {
  let component: EmpresaConsignatariaStatusComponent;
  let fixture: ComponentFixture<EmpresaConsignatariaStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaConsignatariaStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaConsignatariaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
