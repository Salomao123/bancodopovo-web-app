import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaNovoComponent } from './empresa-novo.component';

describe('EmpresaNovoComponent', () => {
  let component: EmpresaNovoComponent;
  let fixture: ComponentFixture<EmpresaNovoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaNovoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
