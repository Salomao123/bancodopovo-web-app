import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPerfilStatusComponent } from './usuario-perfil-status.component';

describe('UsuarioPerfilStatusComponent', () => {
  let component: UsuarioPerfilStatusComponent;
  let fixture: ComponentFixture<UsuarioPerfilStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPerfilStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPerfilStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
