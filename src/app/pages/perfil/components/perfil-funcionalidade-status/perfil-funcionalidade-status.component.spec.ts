import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFuncionalidadeStatusComponent } from './perfil-funcionalidade-status.component';

describe('PerfilFuncionalidadeStatusComponent', () => {
  let component: PerfilFuncionalidadeStatusComponent;
  let fixture: ComponentFixture<PerfilFuncionalidadeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilFuncionalidadeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilFuncionalidadeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
