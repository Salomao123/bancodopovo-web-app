import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFuncionalidadeComponent } from './perfil-funcionalidade.component';

describe('PerfilFuncionalidadeComponent', () => {
  let component: PerfilFuncionalidadeComponent;
  let fixture: ComponentFixture<PerfilFuncionalidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilFuncionalidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilFuncionalidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
