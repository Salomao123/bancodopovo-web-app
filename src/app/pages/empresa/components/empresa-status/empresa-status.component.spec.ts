import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaStatusComponent } from './empresa-status.component';

describe('EmpresaStatusComponent', () => {
  let component: EmpresaStatusComponent;
  let fixture: ComponentFixture<EmpresaStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
