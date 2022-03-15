import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioSenhaComponent } from './usuario-senha.component';

describe('UsuarioSenhaComponent', () => {
  let component: UsuarioSenhaComponent;
  let fixture: ComponentFixture<UsuarioSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
