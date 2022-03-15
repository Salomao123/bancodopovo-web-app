import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaConsignatariaNovoComponent } from './empresa-consignataria-novo.component';

describe('EmpresaConsignatariaNovoComponent', () => {
  let component: EmpresaConsignatariaNovoComponent;
  let fixture: ComponentFixture<EmpresaConsignatariaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaConsignatariaNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaConsignatariaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
